import { create } from "zustand";

import { IRoleManagementStore } from "@/types";

const useRoleManagement = create<IRoleManagementStore>((set) => ({
  // state
  modalRole: false,
  selectedData: null,

  // actions
  toggleModalRole: (isOpen) => set({ modalRole: isOpen }),
  setSelectedData: (id) => set({ selectedData: id }),
}));

export default useRoleManagement;
