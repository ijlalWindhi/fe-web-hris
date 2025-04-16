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
