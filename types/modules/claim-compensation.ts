export interface IClaimCompensationStore {
  modalClaimCompensation: boolean;
  selectedData: IResponseClaimCompensation | null;
  toggleModalClaimCompensation: (isOpen: boolean) => void;
  setSelectedData: (id: IResponseClaimCompensation | null) => void;
}

export interface IResponseClaimCompensation {
  id: number;
  photo: string;
  talent_name: string;
  talent_id: string;
  client_name: string;
  client_id: string;
  service_name: string;
  amount: number;
  payment_date: string;
  type: {
    id: number;
    name: string;
  };
  description: string;
}

export type TPayloadClaimCompensation = {
  code_user: string;
  client_id: number;
  service_name: string;
  amount: number;
  payment_date: string;
  type: number;
  description?: string;
};

export interface IResponseClaimCompensationOptions {
  id: number;
  name: string;
}
