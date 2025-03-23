import axios from "@/lib/axios";
import {
  IResponse,
  IResponseDetailInformationMasterClient,
  IResponseDetailMasterClient,
  IResponseListMasterClient,
  IResponseOptionMasterClient,
  IResponseOptionOutlet,
  TPayloadMasterClient,
  TSearchParams,
} from "@/types";

export async function getListMasterClient(
  params?: TSearchParams,
): Promise<IResponse<IResponseListMasterClient[]>> {
  try {
    const response = await axios.get<IResponse<IResponseListMasterClient[]>>(
      "/client/list",
      {
        params,
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error from service getListMasterClient: ", error);
    throw error;
  }
}

export async function createMasterClient(
  data: TPayloadMasterClient,
): Promise<IResponse<null>> {
  try {
    const response = await axios.post<IResponse<null>>("/client/add", data);
    return response.data;
  } catch (error) {
    console.error("Error from service createMasterClient: ", error);
    throw error;
  }
}

export async function updateMasterClient(
  id: string,
  data: TPayloadMasterClient,
): Promise<IResponse<null>> {
  try {
    const response = await axios.put<IResponse<null>>(
      `/client/edit/${id}`,
      data,
    );
    return response.data;
  } catch (error) {
    console.error("Error from service updateMasterClient: ", error);
    throw error;
  }
}

export async function deleteMasterClient(id: string): Promise<IResponse<null>> {
  try {
    const response = await axios.delete<IResponse<null>>(
      `/client/delete/${id}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error from service deleteMasterClient: ", error);
    throw error;
  }
}

export async function getDetailMasterClient(
  id: string,
): Promise<IResponse<IResponseDetailMasterClient>> {
  try {
    const response = await axios.get<IResponse<IResponseDetailMasterClient>>(
      `/client/${id}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error from service getDetailMasterClient: ", error);
    throw error;
  }
}

export async function getDetailInformationMasterClient(
  id: string,
): Promise<IResponse<IResponseDetailInformationMasterClient>> {
  try {
    const response = await axios.get<
      IResponse<IResponseDetailInformationMasterClient>
    >(`/client/detail/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error from service getDetailInformationMasterClient: ",
      error,
    );
    throw error;
  }
}

export async function getOptionMasterClient(
  src: string,
): Promise<IResponse<IResponseOptionMasterClient[]>> {
  try {
    const response = await axios.get<IResponse<IResponseOptionMasterClient[]>>(
      "/client/option",
      {
        params: {
          src,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error from service getOptionMasterClient: ", error);
    throw error;
  }
}

export async function getOptionOutlet(
  client_id: string,
  src: string,
): Promise<IResponse<IResponseOptionOutlet[]>> {
  try {
    const response = await axios.get<IResponse<IResponseOptionOutlet[]>>(
      "/outlet/option",
      {
        params: {
          src,
          client_id,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error from service getOptionOutlet: ", error);
    throw error;
  }
}
