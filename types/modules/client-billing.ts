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
  invoice_date: string;
  amount_billed: number;
  talent_resource: number;
  status: boolean;
  payment: string;
}
