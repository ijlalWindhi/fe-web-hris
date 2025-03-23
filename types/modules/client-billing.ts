export interface IClientBillingStore {
  modalDetailClientBilling: boolean;
  modalDetailBilling: boolean;
  selectedData: IResponseListClientBilling | null;
  selectedIdBilling: string | null;
  detailType: "detail" | "edit";
  toggleModalDetailClientBilling: (isOpen: boolean) => void;
  toggleModalDetailBilling: (isOpen: boolean) => void;
  setSelectedData: (data: IResponseListClientBilling | null) => void;
  setSelectedIdBilling: (id: string | null) => void;
  setDetailType: (type: "detail" | "edit") => void;
}

export interface IResponseListClientBilling {
  id: string;
  name: string;
  address: string;
  created_at: string;
  isact: boolean;
  payment_status: boolean;
}

export interface IResponseDetailClientBilling {
  id: string;
  date: string;
  client_id: number;
  amount: number;
  total_talent: number;
  status: {
    id: number;
    name: string;
  };
  evidence_payment: string;
}
