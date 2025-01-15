export interface ITalentMappingStore {
  modalDetailTalentMapping: boolean;
  modalTalentMapping: boolean;
  selectedId: null | number;
  toggleModalDetailTalentMapping: (isOpen: boolean) => void;
  toggleModalTalentMapping: (isOpen: boolean) => void;
  setSelectedId: (id: number | null) => void;
}

export interface IResponseList {
  id: number;
  name: string;
  date_of_birth: string;
  id_number: string;
  email: string;
  phone: string;
  address: string;
}
