import { create } from "zustand";

import { IUserManagementStore } from "@/types";

const useUserManagement = create<IUserManagementStore>((set) => ({
  // state
  modalUserManagement: false,
  selectedData: null,

  // actions
  toggleModalUserManagement: (isOpen) => set({ modalUserManagement: isOpen }),
  setSelectedData: (data) => set({ selectedData: data }),
}));

export default useUserManagement;
