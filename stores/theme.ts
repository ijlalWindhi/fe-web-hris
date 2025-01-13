import { create } from "zustand";

import { IThemeStore } from "@/types";

const useTheme = create<IThemeStore>((set) => ({
  // state
  isLoading: false,

  // actions
  setLoading: (loading) => {
    set({ isLoading: loading });
  },
}));

export default useTheme;
