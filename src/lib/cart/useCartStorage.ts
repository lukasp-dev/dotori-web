import { create } from "zustand";

export type School = {
  id: number;
  name: string;
  price: number;
};

type CartState = {
  items: School[];
  addToCart: (item: School) => void;
  removeFromCart: (id: number) => void;
};

export const useCartStorage = create<CartState>((set) => ({
  items: [],
  addToCart: (item) =>
    set((state) => ({
      items: [...state.items, item],
    })),
  removeFromCart: (id) =>
    set((state) => ({
      items: state.items.filter((i) => i.id !== id),
    })),
}));
