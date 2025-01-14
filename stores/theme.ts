import { create } from "zustand";

import { IThemeStore } from "@/types";

const useTheme = create<IThemeStore>((set) => ({
  // state
  isLoading: false,
  isSidebarOpen: false,
  modalSuccess: {
    open: false,
    title: "",
    message: "",
    actionMessage: "Ok, Back",
    actionVariant: "outline",
    animation: "success",
  },

  // actions
  setLoading: (loading) => {
    set({ isLoading: loading });
  },
  setModalSuccess: (modal) => {
    set({ modalSuccess: modal });
  },
  toggleSidebar: () => {
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen }));
  },
}));

export default useTheme;
