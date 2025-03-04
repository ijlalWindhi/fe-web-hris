import { create } from "zustand";

import { ITalentMappingStore } from "@/types";

const useTalentMapping = create<ITalentMappingStore>((set) => ({
  // state
  modalDetailTalentMapping: false,
  modalTalentMapping: false,
  modalHistoryContract: false,
  selectedId: null,

  // actions
  toggleModalDetailTalentMapping: (isOpen) =>
    set({ modalDetailTalentMapping: isOpen }),
  toggleModalTalentMapping: (isOpen) => set({ modalTalentMapping: isOpen }),
  toggleModalHistoryContract: (isOpen) =>
    set({
      modalHistoryContract: isOpen,
    }),
  setSelectedId: (id) => set({ selectedId: id }),
}));

export default useTalentMapping;
