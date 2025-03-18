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
