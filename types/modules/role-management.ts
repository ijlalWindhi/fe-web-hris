export interface IRoleManagementStore {
  modalRole: boolean;
  selectedData: IResponseRoleManagement | null;
  toggleModalRole: (isOpen: boolean) => void;
  setSelectedData: (id: IResponseRoleManagement | null) => void;
}

export interface IPermission {
  id: number;
  permission: string;
  module: {
    id: number;
    nama: string;
  };
}

export interface IResponseRoleManagement {
  id: number;
  name: string;
  total_user: number;
  permission: IPermission[];
}

export interface IResponseDetailRoleManagement {
  id_role: number;
  role_name: string;
  total_user: number;
  permission: IPermission[];
}

export interface IResponseDetailPermission {
  name: string;
  permissions: IResponseOptionsModule[];
}

export interface IResponseOptionsModule {
  id: number;
  name: string;
  isact: boolean;
}

export type TPayloadPermission = {
  role_id: number;
  module_id: number;
  permission_name: string;
};

export interface IResponseRoleOptions {
  id: number;
  name: string;
}
