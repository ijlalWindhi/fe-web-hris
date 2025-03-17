export interface IMasterClientStore {
  modalMasterClient: boolean;
  modalDetailMasterClient: boolean;
  modalDownloadReport: boolean;
  modalAddOutlet: boolean;
  selectedData: IResponseListMasterClient | null;
  selectedIdOutlet: null | string;
  toggleModalMasterClient: (isOpen: boolean) => void;
  toggleModalDetailMasterClient: (isOpen: boolean) => void;
  toggleModalDownloadReport: (isOpen: boolean) => void;
  toggleModalAddOutlet: (isOpen: boolean) => void;
  setSelectedData: (id: IResponseListMasterClient | null) => void;
  setSelectedOutletId: (id: string | null) => void;
}

export interface IResponseListMasterClient {
  id: string;
  name: string;
  address: string;
  payment_date: string;
  outlet: {
    id: number;
    name: string;
    address: string;
    created_at: string;
    isact: boolean;
  }[];
  cs_person: string;
  cs_number: string;
  cs_email: string;
  created_at: string;
  isact: boolean;
}

export type TPayloadMasterClient = {
  name: string;
  address: string;
  outlet: {
    name: string;
    latitude: number;
    longitude: number;
    address: string;
  }[];
  basic_salary: number;
  agency_fee: number;
  payment_date: string;
  bpjs: {
    name: string;
    amount: number;
  }[];
  allowences: {
    name: string;
    amount: number;
  }[];
  cs_person: string;
  cs_number: string;
  cs_email: string;
};

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
