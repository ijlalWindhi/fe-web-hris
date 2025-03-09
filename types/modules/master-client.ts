export interface IMasterClientStore {
  modalMasterClient: boolean;
  modalDetailMasterClient: boolean;
  modalDownloadReport: boolean;
  selectedId: null | number;
  toggleModalMasterClient: (isOpen: boolean) => void;
  toggleModalDetailMasterClient: (isOpen: boolean) => void;
  toggleModalDownloadReport: (isOpen: boolean) => void;
  setSelectedId: (id: number | null) => void;
}

export interface IResponseListMasterClient {
  id: number;
  name: string;
  address: string;
  outlet: string[];
}
