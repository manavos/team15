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

export default function Menu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    fetch("/api/menu-items")
      .then((response) => response.json())
      .then((data) => {
        setMenuItems(data.items);
      });
  }, []);

  const coffeeItems = menuItems.filter((item) => item.category === "coffee");
  const teaItems = menuItems.filter((item) => item.category === "tea");
  const milkteaItems = menuItems.filter((item) => item.category === "milktea");
  const pastryItems = menuItems.filter((item) => item.category === "pastry");
  const cakeItems = menuItems.filter((item) => item.category === "cake");

  return (
    <main>
      <h2>Menu Items</h2>
      <h4>Coffee</h4>
      {coffeeItems.map((item) => (
        <li key={item._id} style={{ marginBottom: "20px" }}>
          <span>{item.name}</span>
          <span style={{ marginLeft: "20px" }}>${item.price}</span>
          <div>{item.description}</div>
          <div>Available? {item.available ? "Yes" : "No"}</div>
        </li>
      ))}

      <h4>Tea</h4>
      {teaItems.map((item) => (
        <li key={item._id} style={{ marginBottom: "20px" }}>
          <span>{item.name}</span>
          <span style={{ marginLeft: "20px" }}>${item.price}</span>
          <div>{item.description}</div>
          <div>Available? {item.available ? "Yes" : "No"}</div>
        </li>
      ))}

      <h4>Milktea</h4>
      {milkteaItems.map((item) => (
        <li key={item._id} style={{ marginBottom: "20px" }}>
          <span>{item.name}</span>
          <span style={{ marginLeft: "20px" }}>${item.price}</span>
          <div>{item.description}</div>
          <div>Available? {item.available ? "Yes" : "No"}</div>
        </li>
      ))}

      <h4>Pastry</h4>
      {pastryItems.map((item) => (
        <li key={item._id} style={{ marginBottom: "20px" }}>
          <span>{item.name}</span>
          <span style={{ marginLeft: "20px" }}>${item.price}</span>
          <div>{item.description}</div>
          <div>Available? {item.available ? "Yes" : "No"}</div>
        </li>
      ))}

      <h4>Cake</h4>
      {cakeItems.map((item) => (
        <li key={item._id} style={{ marginBottom: "20px" }}>
          <span>{item.name}</span>
          <span style={{ marginLeft: "20px" }}>${item.price}</span>
          <div>{item.description}</div>
          <div>Available? {item.available ? "Yes" : "No"}</div>
        </li>
      ))}
    </main>
  );
}
