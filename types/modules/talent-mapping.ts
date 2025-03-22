export interface ITalentMappingStore {
  modalDetailTalentMapping: boolean;
  modalTalentMapping: boolean;
  modalHistoryContract: boolean;
  modalDetailWorkingArrangement: boolean;
  selectedData: IResponseListTalentMapping | null;
  toggleModalDetailTalentMapping: (isOpen: boolean) => void;
  toggleModalTalentMapping: (isOpen: boolean) => void;
  toggleModalHistoryContract: (isOpen: boolean) => void;
  toggleModalDetailWorkingArrangement: (isOpen: boolean) => void;
  setSelectedData: (id: IResponseListTalentMapping | null) => void;
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
}

export interface TShift {
  shift_id: string;
  day: string;
  start_time: string;
  end_time: string;
}

export interface TPayloadTalentMapping {
  photo: string;
  name: string;
  dob: string;
  nik: string;
  email: string;
  phone: string;
  address: string;
  client_id: number;
  outlet_id: number;
  shift: {
    day: string;
    start_time: string;
    end_time: string;
  }[];
  workdays: number;
}

export interface IHistoryContract {
  id: string;
  contract_start_date: string;
  contract_end_date: string;
  contract_document: string;
}
