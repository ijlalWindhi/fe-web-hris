import { create } from "zustand";

import { IClaimCompensationStore } from "@/types";

const useClaimCompensation = create<IClaimCompensationStore>((set) => ({
  // state
  modalClaimCompensation: false,
  selectedData: null,

  // actions
  toggleModalClaimCompensation: (isOpen) =>
    set({ modalClaimCompensation: isOpen }),
  setSelectedData: (id) => set({ selectedData: id }),
}));

export default useClaimCompensation;
