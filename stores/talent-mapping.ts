import { create } from "zustand";

import {
  getOptionMasterClient,
  getOptionOutlet,
} from "@/services/master-client";
import { ITalentMappingStore } from "@/types";

const useTalentMapping = create<ITalentMappingStore>((set) => ({
  // state
  modalDetailTalentMapping: false,
  modalTalentMapping: false,
  modalHistoryContract: false,
  modalDetailWorkingArrangement: false,
  selectedData: null,
  optionsClient: [],
  optionsOutlet: [],

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
  fetchOptionsClient: async () => {
    const response = await getOptionMasterClient();
    set({ optionsClient: response.data || [] });
    return response.data || [];
  },
  fetchOptionsOutlet: async (clientId) => {
    const response = await getOptionOutlet(clientId);
    set({ optionsOutlet: response.data || [] });
    return response.data || [];
  },
}));

export default useTalentMapping;
