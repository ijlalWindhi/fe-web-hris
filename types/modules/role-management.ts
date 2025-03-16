export interface IResponseRoleManagement {
  id: number;
  name: string;
  total_user: number;
  permission: {
    id: number;
    permission: string;
    module: {
      id: number;
      nama: string;
    };
  }[];
}
