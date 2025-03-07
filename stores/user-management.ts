import { create } from "zustand";

import { IUserManagementStore } from "@/types";

const useUserManagement = create<IUserManagementStore>((set) => ({
  // state
  modalUserManagement: false,
  selectedId: null,

  // actions
  toggleModalUserManagement: (isOpen) => set({ modalUserManagement: isOpen }),
  setSelectedId: (id) => set({ selectedId: id }),
}));

export default useUserManagement;
