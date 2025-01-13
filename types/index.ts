// Theme type
export interface IThemeStore {
  isLoading: boolean;
  isSidebarOpen: boolean;
  setLoading: (loading: boolean) => void;
  toggleSidebar: () => void;
}

// Response type
type Data<T = unknown> = T | null;
export interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}

export interface ResponsePagination<T = unknown> {
  results: Data<T>;
  page: number;
  page_size: number;
  count: number;
  page_count: number;
}

export interface ResponseMessage {
  message: string;
}
