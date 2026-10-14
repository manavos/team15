"use client";

import Gallery from "@/components/Gallery";
import { useEffect, useState } from "react";

type MenuItem = {
  _id: string;
  name: string;
  price: number;
  description: string;
  available: boolean;
  category: string;
  imageUrl?: string;
};

export default function Home() {
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
      <section>
        <h1>Welcome to KRISPI!</h1>
        <p>KRISPI is a Cafe opened in 2026 that sells a select variety of drinks and appetizers!</p>
      </section>

      <section>
        <h2>Featured Menu</h2>

        <div className="food-grid">
          {menuItems.slice(0, 6).map((item) => (
            <div className="menu-item" key={item._id}>
              {item.imageUrl && <img className="menu-image" src={item.imageUrl} alt={item.name} />}

              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <span>${item.price}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="gallery-heading">Gallery</h2>
        <Gallery />
      </section>
    </main>
  );
}
