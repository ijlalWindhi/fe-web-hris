export interface IResponseDashboard {
  date: string;
  Attend: number;
  Sick: number;
  Leave: number;
  "Out of City": number;
}

export interface IResponseTad {
  total: number;
  result: { mapped: number; notMapped: number }[];
}

export interface IResponseBilling {
  total: number;
  result: {
    complete: number;
    pending: number;
    overdue: number;
  }[];
}

export interface IResponseAttendanceSummary {
  value: number;
  label: string;
}

export interface IResponsePaymentReminder {
  id: number;
  client_id: string;
  client_name: string;
  date: string;
  amount: number;
  status: number;
  status_name: string;
}

export interface IResponseNotPresence {
  talent_id: string;
  talent_name: string;
  client_name: string;
  outlet_name: string;
  shift: string;
  phone: string;
}
