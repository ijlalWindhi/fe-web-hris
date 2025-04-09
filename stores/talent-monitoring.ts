import { create } from "zustand";

import { ITalentMonitoringStore } from "@/types";

const useTalentMonitoring = create<ITalentMonitoringStore>((set) => ({
  // state
  modalRatingPerformance: false,
  selectedPerformance: null,

  // actions
  toggleModalRatingPerformance: (isOpen) =>
    set({ modalRatingPerformance: isOpen }),
  setSelectedPerformance: (data) => set({ selectedPerformance: data }),
}));

export default useTalentMonitoring;
