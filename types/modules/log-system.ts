export interface ILogSystemStore {
  modalLogSystem: boolean;
  selectedData: IResponseLogSystem | null;
  toggleModalLogSystem: (isOpen: boolean) => void;
  setSelectedData: (id: IResponseLogSystem | null) => void;
}

export interface IResponseLogSystem {
  id: number;
  username: string;
  role: number;
  action: string;
  created_at: string;
  updated_at: string;
  target: string;
  module: string;
  data_before: object;
  data_after: object;
  isact: boolean;
}
