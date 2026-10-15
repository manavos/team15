import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import Home from "@/app/page";
import Menu from "@/app/menu/page";
import OrderPage from "@/app/order/page";
import ReviewForm from "@/components/ReviewForm";

const sampleItems = [
  {
    _id: "1",
    name: "Iced Latte",
    price: 5,
    description: "Espresso with cold milk",
    available: true,
    category: "coffee",
  },
  {
    _id: "2",
    name: "Matcha Cake",
    price: 6.5,
    description: "Layered green tea cake",
    available: true,
    category: "cake",
  },
];

function mockFetchResponse(body: unknown, ok = true, status = 200) {
  const fetchMock = vi.fn().mockResolvedValue({ ok, status, json: () => Promise.resolve(body) });
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("Menu page", () => {
  it("shows a loading message while the fetch is pending", () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() => new Promise(() => {})),
    );
    render(<Menu />);

    expect(screen.getByRole("status")).toHaveTextContent(/loading menu/i);
  });

  it("shows an empty state when the API returns an empty list", async () => {
    mockFetchResponse({ items: [] });
    render(<Menu />);

    expect(await screen.findByText(/our menu is empty/i)).toBeInTheDocument();
  });

  it("shows an error message when the response is not ok", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    mockFetchResponse({ message: "Server error" }, false, 500);
    render(<Menu />);

    expect(await screen.findByRole("alert")).toHaveTextContent(/couldn't load the menu/i);
  });

  it("renders items grouped by category once the fetch succeeds", async () => {
    mockFetchResponse({ items: sampleItems });
    render(<Menu />);

    expect(await screen.findByText("Iced Latte")).toBeInTheDocument();
    expect(screen.getByText("Matcha Cake")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Coffee" })).toBeInTheDocument();
    expect(screen.getByText("$6.50")).toBeInTheDocument();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });
});

describe("Home page", () => {
  it("shows an error message when the fetch is rejected", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("Network down")));
    render(<Home />);

    expect(await screen.findByRole("alert")).toHaveTextContent(/couldn't load the menu/i);
  });

  it("shows an empty state when there are no featured items", async () => {
    mockFetchResponse({ items: [] });
    render(<Home />);

    expect(await screen.findByText(/no featured items yet/i)).toBeInTheDocument();
  });
});

describe("Order page", () => {
  it("renders menu items with add buttons once the fetch succeeds", async () => {
    mockFetchResponse({ items: sampleItems });
    render(<OrderPage />);

    expect(await screen.findAllByRole("button", { name: /add to order/i })).toHaveLength(2);
    expect(screen.getByText(/no items yet/i)).toBeInTheDocument();
  });
});

describe("About page reviews", () => {
  it("shows a loading message while reviews are being fetched", () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() => new Promise(() => {})),
    );
    render(<ReviewForm />);

    expect(screen.getByRole("status")).toHaveTextContent(/loading reviews/i);
  });

  it("shows an empty state when there are no reviews", async () => {
    mockFetchResponse({ reviews: [] });
    render(<ReviewForm />);

    expect(await screen.findByText(/no reviews yet/i)).toBeInTheDocument();
  });

  it("shows an error message when the reviews request fails", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    mockFetchResponse({}, false, 500);
    render(<ReviewForm />);

    expect(await screen.findByRole("alert")).toHaveTextContent(/couldn't load reviews/i);
  });
});
