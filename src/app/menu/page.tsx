"use client";

import StatusMessage from "@/components/StatusMessage";
import { useMenuItems } from "@/lib/useMenuItems";
import styles from "@/styles/menu.module.css";

const sections = [
  { category: "coffee", title: "Coffee" },
  { category: "tea", title: "Tea" },
  { category: "milktea", title: "Milk Tea" },
  { category: "pastry", title: "Pastry" },
  { category: "cake", title: "Cake" },
] as const;

export default function Menu() {
  const { items: menuItems, loading, error } = useMenuItems();

  return (
    <main className={styles.page}>
      <h1 className={styles.pageTitle}>Menu</h1>

      {loading && <StatusMessage type="loading">Loading menu...</StatusMessage>}
      {error && <StatusMessage type="error">{error}</StatusMessage>}
      {!loading && !error && menuItems.length === 0 && (
        <StatusMessage type="empty">Our menu is empty right now. Check back soon!</StatusMessage>
      )}

      {sections.map(({ category, title }) => {
        const items = menuItems.filter((item) => item.category === category);

        if (items.length === 0) {
          return null;
        }

        return (
          <section key={category} className={styles.section}>
            <h2 className={styles.sectionTitle}>{title}</h2>

            <ul className={styles.menuGrid}>
              {items.map((item) => (
                <li key={item._id} className={styles.menuCard}>
                  {item.imageUrl && <img src={item.imageUrl} alt={item.name} className={styles.menuImage} />}

                  <div className={styles.cardContent}>
                    <div className={styles.cardHeader}>
                      <h3 className={styles.itemName}>{item.name}</h3>

                      <span className={styles.price}>${item.price.toFixed(2)}</span>
                    </div>

                    <p className={styles.description}>{item.description}</p>

                    {!item.available && <p className={styles.unavailable}>Currently unavailable</p>}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </main>
  );
}
