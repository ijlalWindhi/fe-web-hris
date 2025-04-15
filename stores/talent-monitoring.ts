import { create } from "zustand";

import { ITalentMonitoringStore } from "@/types";

const useTalentMonitoring = create<ITalentMonitoringStore>((set) => ({
  // state
  modalRatingPerformance: false,
  modalApproveLeave: false,
  modalRejectLeave: false,
  selectedPerformance: null,
  selectedLeave: null,

  // actions
  toggleModalRatingPerformance: (isOpen) =>
    set({ modalRatingPerformance: isOpen }),
  toggleModalApproveLeave: (isOpen) => set({ modalApproveLeave: isOpen }),
  toggleModalRejectLeave: (isOpen) => set({ modalRejectLeave: isOpen }),
  setSelectedPerformance: (data) => set({ selectedPerformance: data }),
  setSelectedLeave: (leave) => set({ selectedLeave: leave }),
}));

export default useTalentMonitoring;
