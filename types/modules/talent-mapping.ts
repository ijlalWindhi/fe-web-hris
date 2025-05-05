import {
  IResponseOptionMasterClient,
  IResponseOptionOutlet,
} from "./master-client";

export interface ITalentMappingStore {
  modalDetailTalentMapping: boolean;
  modalTalentMapping: boolean;
  modalHistoryContract: boolean;
  modalDetailWorkingArrangement: boolean;
  selectedData: IResponseListTalentMapping | null;
  optionsClient: IResponseOptionMasterClient[];
  optionsOutlet: IResponseOptionOutlet[];
  outletId: string;
  clientId: string;
  toggleModalDetailTalentMapping: (isOpen: boolean) => void;
  toggleModalTalentMapping: (isOpen: boolean) => void;
  toggleModalHistoryContract: (isOpen: boolean) => void;
  toggleModalDetailWorkingArrangement: (isOpen: boolean) => void;
  setSelectedData: (id: IResponseListTalentMapping | null) => void;
  fetchOptionsClient: () => Promise<IResponseOptionMasterClient[]>;
  fetchOptionsOutlet: (clientId: string) => Promise<IResponseOptionOutlet[]>;
  setOutletId: (outletId: string) => void;
  setClientId: (clientId: string) => void;
}

export interface IResponseListTalentMapping {
  talend_id: string;
  photo: string;
  name: string;
  dob: string;
  nik: string;
  email: string;
  phone: string;
  address: string;
}

export interface IResponseDetailTalentMapping {
  talent_id: string;
  photo: string;
  name: string;
  dob: string;
  nik: string;
  email: string;
  phone: string;
  address: string;
  bpjs_number: string;
  bank_account_name: string | null;
  bank_account_number: string | null;
  ptkp: number;
  ptkp_name: string;
  npwp: string;
  type_tad: number;
  role_id: number;
  gender: number;
  client: {
    id: string;
    name: string;
  };
  outlet: {
    id: string;
    name: string;
  };
  workdays: string;
  shift: TShift[];
  contract: {
    start_date: string;
    end_date: string;
    file: string;
    current_salary: number;
    resign_date: string | null;
  };
}

export interface IResponseViewTalentMapping {
  personal: {
    role_name: string;
    talent_id: string;
    name: string;
    dob: string;
    nik: string;
    email: string;
    phone: string;
    address: string;
    face_id: string;
    photo: string;
  };
  mapping: {
    client_id: string;
    client_name: string;
    client_address: string;
    outlet_name: string;
    outlet_address: string;
    outlet_latitude: number;
    outlet_longitude: number;
    workdays: number;
    workarg: {
      shift_id: string;
      day: string;
      start_time: string;
      end_time: string;
    }[];
    contract: {
      start_date: string;
      end_date: string;
      file: string;
    };
  };
}

export interface IResponseHistoryTalentMapping {
  start_date: string;
  end_date: string;
  file: string;
  file_name: string;
}

export interface IResponseTalentOptions {
  id: string;
  name: string;
}

export interface TShift {
  shift_id: string;
  day: string;
  start_time: string;
  end_time: string;
}

export interface TPayloadTalentMapping {
  photo?: string;
  name?: string;
  dob?: string;
  nik?: string;
  email?: string;
  phone?: string;
  address?: string;
  bpjs_number?: string | null;
  bank_account_name?: string | null;
  bank_account_number?: string | null;
  ptkp?: number;
  npwp?: string;
  type_tad?: number;
  role_id?: number;
  gender?: number;
  client_id?: number;
  outlet_id?: number;
  shift?: {
    shift_id?: string | null;
    day: string;
    start_time: string;
    end_time: string;
  }[];
  workdays?: number;
  contract?: {
    start_date: string;
    end_date: string;
    file: string;
    current_salary?: number;
    resign_date?: string;
  };
}

export interface IResponsePtkpOptions {
  id: number;
  tipe: string;
}

export interface IResponseRoleTalentMappingOptions {
  id: string;
  name: string;
}
