import { create } from "zustand";

import { IMasterClientStore } from "@/types";

const useMasterClient = create<IMasterClientStore>((set) => ({
  // state
  modalMasterClient: false,
  modalDetailMasterClient: false,
  modalDownloadReport: false,
  modalAddOutlet: false,
  selectedId: null,

  // actions
  toggleModalMasterClient: (isOpen) => set({ modalMasterClient: isOpen }),
  toggleModalDetailMasterClient: (isOpen) =>
    set({ modalDetailMasterClient: isOpen }),
  toggleModalDownloadReport: (isOpen) => set({ modalDownloadReport: isOpen }),
  toggleModalAddOutlet: (isOpen) => set({ modalAddOutlet: isOpen }),
  setSelectedId: (id) => set({ selectedId: id }),
}));

export default useMasterClient;
