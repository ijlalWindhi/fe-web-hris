export interface IHistoryPaymentStore {
  modalDetailHistoryPayment: boolean;
  selectedData: IResponseListHistoryPayment | null;
  toggleModalDetailHistoryPayment: (isOpen: boolean) => void;
  setSelectedData: (data: IResponseListHistoryPayment | null) => void;
}

export interface IResponseListHistoryPayment {
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

export interface IResponseDetailHistoryPayment {
  title: string;
  client_id: number;
  client_name: string;
  start_period: string;
  end_period: string;
  detail: {
    keterangan: string;
    nominal: number;
    jumlah: number;
  }[];
}
