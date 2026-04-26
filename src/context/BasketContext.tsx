"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Card } from "@/data/cards";

export interface BasketItem {
  card: Card;
  quantity: number;
  message: string;
}

interface BasketContextType {
  items: BasketItem[];
  addItem: (card: Card, message: string, quantity: number) => void;
  removeItem: (cardId: string) => void;
  updateQuantity: (cardId: string, quantity: number) => void;
  clearBasket: () => void;
  totalItems: number;
}

const BasketContext = createContext<BasketContextType | undefined>(undefined);

export function BasketProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<BasketItem[]>([]);

  const addItem = (card: Card, message: string, quantity: number) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.card.id === card.id);
      if (existing) {
        return prev.map((i) =>
          i.card.id === card.id
            ? { ...i, quantity: i.quantity + quantity, message }
            : i
        );
      }
      return [...prev, { card, quantity, message }];
    });
  };

  const removeItem = (cardId: string) => {
    setItems((prev) => prev.filter((i) => i.card.id !== cardId));
  };

  const updateQuantity = (cardId: string, quantity: number) => {
    if (quantity < 1) return removeItem(cardId);
    setItems((prev) =>
      prev.map((i) => (i.card.id === cardId ? { ...i, quantity } : i))
    );
  };

  const clearBasket = () => setItems([]);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <BasketContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearBasket, totalItems }}>
      {children}
    </BasketContext.Provider>
  );
}

export function useBasket() {
  const ctx = useContext(BasketContext);
  if (!ctx) throw new Error("useBasket must be used within BasketProvider");
  return ctx;
}
