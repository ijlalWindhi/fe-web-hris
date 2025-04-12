import { create } from "zustand";

import { IMasterHolidayStore } from "@/types";

const useMasterClient = create<IMasterHolidayStore>((set) => ({
  // state
  modalMasterHoliday: false,
  selectedData: null,

  // actions
  toggleModalMasterHoliday: (isOpen) => set({ modalMasterHoliday: isOpen }),
  setSelectedData: (id) => set({ selectedData: id }),
}));

export default useMasterClient;
