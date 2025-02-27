export interface IMeta {
  page: number;
  page_size: number;
  count: number;
  page_count: number;
}

// Default Response type
export interface IResponsePagination<T = unknown> {
  results: T[];
  page: number;
  page_size: number;
  count: number;
  page_count: number;
}

export interface IResponseMessage {
  message: string;
}
