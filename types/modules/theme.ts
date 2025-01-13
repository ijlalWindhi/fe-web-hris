export interface IThemeStore {
  isLoading: boolean;
  modalSuccess: IModalSuccess;
  setLoading: (loading: boolean) => void;
  setModalSuccess: (modal: IModalSuccess) => void;
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
  animation?: "success";
  action?: () => void;
}
