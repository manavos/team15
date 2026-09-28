const items = [
  { id: 1, name: "Burger", available: true },
  { id: 2, name: "Fries", available: false },
];

export async function GET() {
  return Response.json(items);
}

export async function POST(request: Request) {
  console.log(await request.json());
  return Response.json({ message: "item created" });
}
