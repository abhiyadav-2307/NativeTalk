import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("NativeTalk-theme") || "light",
  setTheme: (theme) => {
    localStorage.setItem("NativeTalk-theme", theme);
    set({ theme });
  },
}));