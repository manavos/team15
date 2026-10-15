"use client";

import StatusMessage from "@/components/StatusMessage";
import { useMenuItems } from "@/lib/useMenuItems";

export default function Home() {
  const { items: menuItems, loading, error } = useMenuItems();

  return (
    <main className="page">
      <section>
        <h1>Welcome to KRISPI!</h1>
        <p>KRISPI is a Cafe opened in 2026 that sells a select variety of drinks and appetizers!</p>
      </section>

      <section>
        <h2>Featured Menu</h2>

        {loading ? (
          <StatusMessage type="loading">Loading featured menu...</StatusMessage>
        ) : error ? (
          <StatusMessage type="error">{error}</StatusMessage>
        ) : menuItems.length === 0 ? (
          <StatusMessage type="empty">No featured items yet. Check back soon!</StatusMessage>
        ) : (
          <div className="food-grid">
            {menuItems.map((item) => (
              <div className="menu-item" key={item._id}>
                {item.imageUrl && <img className="menu-image" src={item.imageUrl} alt={item.name} />}

                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <span>${item.price}</span>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
