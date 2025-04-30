import { create } from "zustand";

import { ITypeTadStore } from "@/types";

const useTypeTad = create<ITypeTadStore>((set) => ({
  // state
  modalTypeTad: false,
  selectedData: null,

  // actions
  toggleModalTypeTad: (isOpen) => set({ modalTypeTad: isOpen }),
  setSelectedData: (id) => set({ selectedData: id }),
}));

export default useTypeTad;
