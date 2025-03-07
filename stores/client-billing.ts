import { create } from "zustand";

import { IClientBillingStore } from "@/types";

const useClientBilling = create<IClientBillingStore>((set) => ({
  // state
  modalDetailClientBilling: false,
  selectedId: null,
  detailType: "detail",

  // actions
  toggleModalDetailClientBilling: (isOpen) =>
    set({ modalDetailClientBilling: isOpen }),
  setSelectedId: (id) => set({ selectedId: id }),
  setDetailType: (type) => set({ detailType: type }),
}));

export default useClientBilling;
