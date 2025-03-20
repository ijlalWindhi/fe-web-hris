import { create } from "zustand";

import { IClientBillingStore } from "@/types";

const useClientBilling = create<IClientBillingStore>((set) => ({
  // state
  modalDetailClientBilling: false,
  selectedData: null,
  detailType: "detail",

  // actions
  toggleModalDetailClientBilling: (isOpen) =>
    set({ modalDetailClientBilling: isOpen }),
  setSelectedData: (data) => set({ selectedData: data }),
  setDetailType: (type) => set({ detailType: type }),
}));

export default useClientBilling;
