export interface IMasterClientStore {
  modalMasterClient: boolean;
  modalDetailMasterClient: boolean;
  modalDownloadReport: boolean;
  modalAddOutlet: boolean;
  selectedData: IResponseListMasterClient | null;
  selectedOutlet: IOutletList | null;
  toggleModalMasterClient: (isOpen: boolean) => void;
  toggleModalDetailMasterClient: (isOpen: boolean) => void;
  toggleModalDownloadReport: (isOpen: boolean) => void;
  toggleModalAddOutlet: (isOpen: boolean) => void;
  setSelectedData: (id: IResponseListMasterClient | null) => void;
  setSelectedOutlet: (id: IOutletList | null) => void;
}

export interface IResponseListMasterClient {
  id: string;
  name: string;
  address: string;
  photo: string;
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

export interface IResponseDetailMasterClient {
  id: string;
  name: string;
  address: string;
  outlet: {
    id_outlet: string;
    name: string;
    address: string;
    total_active: number;
    latitude: number;
    longitude: number;
  }[];
  basic_salary: string;
  agency_fee: string;
  payment_date: string;
  bpjs: {
    id: string;
    name: string;
    amount: string;
  }[];
  allowences: {
    id: string;
    name: string;
    amount: string;
  }[];
  cs_person: string;
  cs_number: string;
  cs_email: string;
}

export type TPayloadMasterClient = {
  photo: string;
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
  total_active: number;
  cs_name: string;
  cs_email: string;
  cs_phone: string;
  address: string;
}

export interface IOutletList {
  id_outlet?: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  index: number;
}
