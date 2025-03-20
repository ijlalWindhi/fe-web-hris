export interface IResponseListTalentMonitoring {
  talend_id: string;
  name: string;
  dob: string;
  nik: string;
  email: string;
  phone: string;
  address: string;
}

export interface IResponseTalentInformation {
  name: string;
  role: {
    id: number;
    name: string;
  };
  talent_id: string;
  dob: string;
  phone: string;
  address: string;
  nik: string;
  email: string;
  photo: string;
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

export interface ITalentPerformanceTalentMonitoring {
  id: string;
  month: string;
  soft_skill: number;
  hard_skill: number;
  total_point: number;
  notes: string;
}

export interface ITimesheetHistoryTalentMonitoring {
  id: string;
  date: string;
  working_hours: string;
  notes: string;
}

export interface ILeaveSubmissionTalentMonitoring {
  id: string;
  leave_type: string;
  date_period: string;
  total_days: number;
  notes: string;
  evidence: string | null;
  status: string;
}

export interface IAttendanceHistoryTalentMonitoring {
  id: string;
  date: string;
  location: string;
  clock_in: string;
  clock_out: string;
}
