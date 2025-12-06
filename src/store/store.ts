import { create } from "zustand";

export const authStore = create((set) => ({
  tokenValue: sessionStorage.getItem("token") || null,
  setToken: (token: string) => {
    sessionStorage.setItem("token",token);
    set({
      tokenValue:token
    });
  },
  clearToken: () => {
    sessionStorage.removeItem("token");
    set({
      tokenValue: null,
    });
  },
}));
