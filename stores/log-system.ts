import { create } from "zustand";

import { ILogSystemStore } from "@/types";

const useLogSystem = create<ILogSystemStore>((set) => ({
  // state
  modalLogSystem: false,
  selectedData: null,

  // actions
  toggleModalLogSystem: (isOpen) => set({ modalLogSystem: isOpen }),
  setSelectedData: (id) => set({ selectedData: id }),
}));

export default useLogSystem;
