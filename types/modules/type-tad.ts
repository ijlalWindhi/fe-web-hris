export interface ITypeTadStore {
  modalTypeTad: boolean;
  selectedData: IResponseTypeTad | null;
  toggleModalTypeTad: (isOpen: boolean) => void;
  setSelectedData: (id: IResponseTypeTad | null) => void;
}

export interface IResponseTypeTad {
  code: string;
  id_client: number;
  name_client: string;
  type_tad: string;
  type_employee: string;
  positional_allowance: number;
  isact: boolean;
}

export type TPayloadTypeTad = {
  code?: string;
  id_client: number;
  type_tad: string;
  type_employee: string;
  positional_allowance: number;
};

export interface IResponseTypeTadOptions {
  id: number;
  type_tad: string;
  type_employee: string;
  client_name: string;
}
