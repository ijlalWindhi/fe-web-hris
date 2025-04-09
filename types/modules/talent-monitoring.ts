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

export interface IResponseTalentMapping {
  client: {
    id: number;
    name: string;
    address: string;
  };
  outlet: {
    address: string;
    name: string;
    latitude: number;
    longitude: number;
  };
  workdays: number;
  workarr: {
    shift_id: string;
    day: string;
    time_start: string;
    time_end: string;
  }[];
}

export interface IResponseContract {
  talent_id: string;
  talent_name: string;
  talent_role: string;
  contract: {
    id: number;
    start_date: string;
    end_date: string;
    file: string;
  };
  history: IHistoryContractTalentMonitoring[];
}

export interface IResponseAttendance {
  name: string;
  role: {
    id: number;
    name: string;
  };
  attendance: IAttendanceHistoryTalentMonitoring[];
  leave_submission: ILeaveSubmissionTalentMonitoring[];
  graph: {
    type: string;
    desktop: number;
  };
}

export interface IResponseTimesheet {
  name: string;
  role_name: string;
  total_workdays: number;
  timesheet: ITimesheetHistoryTalentMonitoring[];
}

export interface IResponsePerformance {
  name: string;
  role_name: string;
  performance: string;
  history: ITalentPerformanceTalentMonitoring[];
}

export interface IResponsePayroll {
  emp_name: string | null;
  emp_code: string | null;
  emp_role: string | null;
  payroll: {
    month: string;
    gaji_pokok: number;
    tunjangan_makan: number;
    bpjs_kesehatan: number;
    pajak_pph21: number;
    bonus: number;
    agency_fee: number;
    total: number;
  }[];
}

export interface IHistoryContractTalentMonitoring {
  start_date: string;
  end_date: string;
  file: string;
  file_name: string;
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
  id: number;
  date: string;
  softskill: number;
  hardskill: number;
  total_point: string;
  notes: string;
}

export interface ITimesheetHistoryTalentMonitoring {
  date: string;
  working_hours: string;
  notes: string;
  outlet: {
    id: number;
    name: string;
  };
}

export interface ILeaveSubmissionTalentMonitoring {
  total_pending: number;
  type: string;
  date_period: number;
  start_date: string;
  end_date: string;
  note: string;
  evidence: string;
  file_name: string | null;
  status: {
    id: number;
    name: string;
  };
}

export interface IAttendanceHistoryTalentMonitoring {
  total_workdays: number;
  id: number;
  date: string;
  location: string;
  clock_in: string;
  clock_out: string;
}

export interface IParamsSearch {
  talent_id: string;
  start_date?: string;
  end_date?: string;
}

export interface IResponseShiftCalender {
  id: number;
  emp_id: string;
  emp_name: string;
  client_id: number;
  outlet_id: number;
  day: string;
  time_start: string;
  time_end: string;
  workdays: number;
  created_at: string;
}

export type TParamsShiftCalender = {
  client_id: string;
  outlet_id: string;
  start_date: string;
  end_date: string;
};
