type Data<T = unknown> = T | null;
export interface IMeta {
  page: number;
  page_size: number;
  count: number;
  page_count: number;
}

// Default Response type
export interface IResponsePagination<T = unknown> {
  results: Data<T>;
  page: number;
  page_size: number;
  count: number;
  page_count: number;
}

export interface IResponse<T = unknown> {
  meta: IMeta;
  data: Data<T>;
  status: string;
  code: number;
  message: string;
}

export type TSearchParams = {
  page: number;
  page_size: number;
  src: string | undefined;
  client_id?: string;
  outlet_id?: string;
};
