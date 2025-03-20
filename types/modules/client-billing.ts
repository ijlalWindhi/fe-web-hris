export interface IClientBillingStore {
  modalDetailClientBilling: boolean;
  selectedData: IResponseListClientBilling | null;
  detailType: "detail" | "edit";
  toggleModalDetailClientBilling: (isOpen: boolean) => void;
  setSelectedData: (data: IResponseListClientBilling | null) => void;
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
  invoice_date: string;
  amount_billed: number;
  talent_resource: number;
  status: boolean;
  payment: string;
}
