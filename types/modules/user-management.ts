export interface IUserManagementStore {
  modalUserManagement: boolean;
  selectedData: IResponseUserManagement | null;
  toggleModalUserManagement: (isOpen: boolean) => void;
  setSelectedData: (data: IResponseUserManagement | null) => void;
}

export interface IResponseUserManagement {
  id_user: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  role: {
    id: number;
    name: string;
  };
  client: {
    id: number | null;
    name: string | null;
  };
  status: boolean;
  photo: string;
}

export type TPayloadUserManagement = {
  name: string;
  email: string;
  phone: string;
  role_id: number;
  address: string;
  photo: string;
};
