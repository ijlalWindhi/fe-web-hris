export interface IMasterHolidayStore {
  modalMasterHoliday: boolean;
  selectedData: IResponseListMasterHoliday | null;
  toggleModalMasterHoliday: (isOpen: boolean) => void;
  setSelectedData: (id: IResponseListMasterHoliday | null) => void;
}

export interface IResponseListMasterHoliday {
  id: number;
  date: string;
  name: string;
  note: string;
  is_national: boolean;
}

export type TPayloadMasterHoliday = {
  name: string;
  date: string;
  note: string;
  is_national: boolean;
};
