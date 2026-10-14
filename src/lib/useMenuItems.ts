"use client";

import { useEffect, useState } from "react";

export type MenuItem = {
  _id: string;
  name: string;
  price: number;
  description: string;
  available: boolean;
  category: string;
  imageUrl?: string;
};

export function useMenuItems() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const response = await fetch("/api/menu-items");
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const data = await response.json();
        if (!cancelled) {
          setItems(data.items ?? []);
        }
      } catch (err) {
        console.error("Could not load menu items:", err);
        if (!cancelled) {
          setError("We couldn't load the menu right now. Please try again later.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { items, loading, error };
}
