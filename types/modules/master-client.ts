export interface IMasterClientStore {
  modalMasterClient: boolean;
  modalDetailMasterClient: boolean;
  modalDownloadReport: boolean;
  modalAddOutlet: boolean;
  selectedId: null | number;
  selectedIdOutlet: null | string;
  toggleModalMasterClient: (isOpen: boolean) => void;
  toggleModalDetailMasterClient: (isOpen: boolean) => void;
  toggleModalDownloadReport: (isOpen: boolean) => void;
  toggleModalAddOutlet: (isOpen: boolean) => void;
  setSelectedId: (id: number | null) => void;
  setSelectedOutletId: (id: string | null) => void;
}

export interface IResponseListMasterClient {
  id: number;
  name: string;
  address: string;
  outlet: string[];
}

export interface IListOutlet {
  id: number;
  name: string;
  address: string;
}

export interface IOutletList {
  id: string;
  name: string;
  address: string;
  lat: string;
  long: string;
}
