export interface IThemeStore {
  isLoading: boolean;
  isSidebarOpen: boolean;
  modalSuccess: IModalSuccess;
  setLoading: (loading: boolean) => void;
  setModalSuccess: (modal: IModalSuccess) => void;
  toggleSidebar: () => void;
}

interface IModalSuccess {
  open: boolean;
  title: string;
  message: string;
  actionMessage?: string;
  actionVariant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  animation?: "success" | "email";
  action?: () => void;
}

// Header Dashboard
export interface INavItem {
  id: number;
  title: string;
  path: string;
  icon: string;
  sub: INavItem[];
}
