import { create } from "zustand";

import { IClientBillingStore } from "@/types";

const useClientBilling = create<IClientBillingStore>((set) => ({
  // state
  modalDetailClientBilling: false,
  modalDetailBilling: false,
  selectedData: null,
  selectedIdBilling: null,
  detailType: "detail",

  // actions
  toggleModalDetailClientBilling: (isOpen) =>
    set({ modalDetailClientBilling: isOpen }),
  toggleModalDetailBilling: (isOpen) => set({ modalDetailBilling: isOpen }),
  setSelectedData: (data) => set({ selectedData: data }),
  setSelectedIdBilling: (id) => set({ selectedIdBilling: id }),
  setDetailType: (type) => set({ detailType: type }),
}));

export default useClientBilling;
