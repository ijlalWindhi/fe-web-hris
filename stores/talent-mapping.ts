import { create } from "zustand";

import { ITalentMappingStore } from "@/types";

const useTalentMapping = create<ITalentMappingStore>((set) => ({
  // state
  modalDetailTalentMapping: false,
  modalTalentMapping: false,
  modalHistoryContract: false,
  modalDetailWorkingArrangement: false,
  selectedData: null,

  // actions
  toggleModalDetailTalentMapping: (isOpen) =>
    set({ modalDetailTalentMapping: isOpen }),
  toggleModalTalentMapping: (isOpen) => set({ modalTalentMapping: isOpen }),
  toggleModalHistoryContract: (isOpen) =>
    set({
      modalHistoryContract: isOpen,
    }),
  toggleModalDetailWorkingArrangement: (isOpen) =>
    set({ modalDetailWorkingArrangement: isOpen }),
  setSelectedData: (id) => set({ selectedData: id }),
}));

export default useTalentMapping;
