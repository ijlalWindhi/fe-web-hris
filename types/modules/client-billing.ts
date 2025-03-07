export interface IClientBillingStore {
  modalDetailClientBilling: boolean;
  selectedId: null | number;
  detailType: "detail" | "edit";
  toggleModalDetailClientBilling: (isOpen: boolean) => void;
  setSelectedId: (id: number | null) => void;
  setDetailType: (type: "detail" | "edit") => void;
}

export interface IResponseListClientBilling {
  id: number;
  name: string;
  address: string;
  status: string;
}

export interface IListDetailClientBilling {
  month: string;
  talent_resource: number;
  billing: string;
  status: string;
  payment: string;
}
