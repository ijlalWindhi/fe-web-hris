import { create } from "zustand";

import { ITalentMappingStore } from "@/types";

const useTalentMapping = create<ITalentMappingStore>((set) => ({
  // state
  modalDetailTalentMapping: false,
  modalTalentMapping: false,
  selectedId: null,

  // actions
  toggleModalDetailTalentMapping: (isOpen) =>
    set({ modalDetailTalentMapping: isOpen }),
  toggleModalTalentMapping: (isOpen) => set({ modalTalentMapping: isOpen }),
  setSelectedId: (id) => set({ selectedId: id }),
}));

export default useTalentMapping;
