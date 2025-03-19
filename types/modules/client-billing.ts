export interface IClientBillingStore {
  modalDetailClientBilling: boolean;
  selectedId: null | string;
  detailType: "detail" | "edit";
  toggleModalDetailClientBilling: (isOpen: boolean) => void;
  setSelectedId: (id: string | null) => void;
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
  month: string;
  talent_resource: number;
  billing: string;
  status: string;
  payment: string;
}
