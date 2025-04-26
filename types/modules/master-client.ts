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
  photo: string;
  npwp: string;
  brand_name: string;
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
    id_daily: boolean;
  }[];
  cs_person: string;
  cs_number: string;
  cs_email: string;
  start_contract: string;
  end_contract: string;
  file_contract: string;
}

export interface IResponseDetailInformationMasterClient {
  name: string;
  address: string;
  id_client: string;
  outlet: IListOutlet[];
  payroll: {
    basic_salary: string;
    agency_fee: string;
    allowance: string;
    total_deduction: string;
    nett_payment: string;
    due_date: string;
  };
  total_active: string;
  manager_signature: string;
  technical_signature: string;
  role1_signature: string;
  role2_signature: string;
  role3_signature: string;
  cs_person: string;
  cs_number: string;
  cs_email: string;
  photo: string;
}

export interface IResponseOptionMasterClient {
  id: number;
  id_client: string;
  name: string;
  address: string;
}

export interface IResponseOptionOutlet {
  id: number;
  outlet_id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

export type TPayloadMasterClient = {
  photo: string;
  name: string;
  address: string;
  npwp: string;
  brand_name: string;
  outlet: {
    id_outlet?: string;
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
    is_daily: boolean;
  }[];
  cs_person: string;
  cs_number: string;
  cs_email: string;
  start_contract: string;
  end_contract: string;
  file_contract: string;
};

export interface IListOutlet {
  id_outlet: string;
  name: string;
  total_active: string;
  address: string;
  latitude: string;
  longitude: string;
}

export interface IOutletList {
  id_outlet?: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  index: number;
}

export type TPayloadSignature = {
  id: string;
  type: string;
  file: string;
};
