import { create } from 'zustand';

export const isLogin = create((set) => ({
  state: { isLogin: false, me: {} },
  setState: ({ isLogin, info }) => set({ state: { isLogin, info } }),
}));
