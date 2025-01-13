// Default Response type
export interface IApiResponse<T> {
  data: T;
  message: string;
  status: number;
}

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
