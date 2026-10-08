"use client";

import { useEffect, useState } from "react";

type MenuItem = {
  _id: string;
  name: string;
  price: number;
  description: string;
  available: boolean;
  category: string;
};

const sections = [
  { category: "coffee", title: "Coffee" },
  { category: "tea", title: "Tea" },
  { category: "milktea", title: "Milktea" },
  { category: "pastry", title: "Pastry" },
  { category: "cake", title: "Cake" },
] as const;

export default function Menu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    fetch("/api/menu-items")
      .then((response) => response.json())
      .then((data) => {
        setMenuItems(data.items);
      });
  }, []);

  return (
    <main className="page">
      <h1>Menu Items</h1>
      {sections.map(({ category, title }) => (
        <section key={category}>
          <h2>{title}</h2>
          <ul className="item-list">
            {menuItems
              .filter((item) => item.category === category)
              .map((item) => (
                <li key={item._id}>
                  <strong>{item.name}</strong>
                  <span className="price">${item.price.toFixed(2)}</span>
                  <div>{item.description}</div>
                  <div>Available? {item.available ? "Yes" : "No"}</div>
                </li>
              ))}
          </ul>
        </section>
      ))}
    </main>
  );
}
