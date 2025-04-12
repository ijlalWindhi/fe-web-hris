import { create } from "zustand";

import { IHistoryPaymentStore } from "@/types";

const useHistoryPayment = create<IHistoryPaymentStore>((set) => ({
  // state
  modalDetailHistoryPayment: false,
  selectedData: null,

  // actions
  toggleModalDetailHistoryPayment: (isOpen) =>
    set({ modalDetailHistoryPayment: isOpen }),
  setSelectedData: (id) => set({ selectedData: id }),
}));

export default useHistoryPayment;
