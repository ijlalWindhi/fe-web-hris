export interface IUserManagementStore {
  modalUserManagement: boolean;
  selectedId: null | number;
  toggleModalUserManagement: (isOpen: boolean) => void;
  setSelectedId: (id: number | null) => void;
}

export interface IResponseListUserManagement {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  client_name: string;
  role: string;
  status: string;
}
