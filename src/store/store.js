import { create } from 'zustand';

export const isLogin = create((set) => ({
  state: { isLogin: false, info: { id: 0 } },
  setState: ({ isLogin, info }) => set({ state: { isLogin, info } }),
}));
