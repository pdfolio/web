import { create } from 'zustand';

export const isLogin = create((set) => ({
  state: false,
  setState: (newState) => set({ state: newState }),
}));
