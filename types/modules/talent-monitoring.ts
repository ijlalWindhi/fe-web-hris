export interface IResponseListTalentMonitoring {
  id: number;
  name: string;
  date_of_birth: string;
  id_number: string;
  email: string;
  phone: string;
  address: string;
}

export interface IHistoryContractTalentMonitoring {
  id: string;
  start_date: string;
  end_date: string;
  contract_document: string;
}

export interface IPayrollDetailsTaletMonitoring {
  id: string;
  month: string;
  gaji_pokok: string;
  tunjangan_makan: string;
  tunjangan_bensin: string;
  bonus_performance: string;
  potongan_pajak: string;
  agency_fee: string;
  total: string;
}
