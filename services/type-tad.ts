import axios from "@/lib/axios";
import {
  IResponse,
  IResponseTypeTad,
  IResponseTypeTadOptions,
  TPayloadTypeTad,
  TSearchParams,
} from "@/types";

export async function getListTypeTad(
  params?: TSearchParams,
): Promise<IResponse<IResponseTypeTad[]>> {
  try {
    const response = await axios.get<IResponse<IResponseTypeTad[]>>(
      "/type-tad",
      {
        params,
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error from service getListTypeTad: ", error);
    throw error;
  }
}

export async function getDetailTypeTad(
  id: number,
): Promise<IResponse<IResponseTypeTad>> {
  try {
    const response = await axios.get<IResponse<IResponseTypeTad>>(
      `/type-tad/detail/${id}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error from service getDetailTypeTad: ", error);
    throw error;
  }
}

export async function createTypeTad(
  data: TPayloadTypeTad,
): Promise<IResponse<null>> {
  try {
    const response = await axios.post<IResponse<null>>("/type-tad", data);
    return response.data;
  } catch (error) {
    console.error("Error from service createTypeTad: ", error);
    throw error;
  }
}

export async function editTypeTad(
  id: string,
  data: TPayloadTypeTad,
): Promise<IResponse<null>> {
  try {
    const response = await axios.put<IResponse<null>>(
      `/type-tad/detail/${id}`,
      data,
    );
    return response.data;
  } catch (error) {
    console.error("Error from service editTypeTad: ", error);
    throw error;
  }
}

export async function deleteTypeTad(id: string): Promise<IResponse<null>> {
  try {
    const response = await axios.delete<IResponse<null>>(
      `/type-tad/detail/${id}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error from service deleteTypeTad: ", error);
    throw error;
  }
}

export async function getTypeTadOptions(): Promise<
  IResponse<IResponseTypeTadOptions[]>
> {
  try {
    const response =
      await axios.get<IResponse<IResponseTypeTadOptions[]>>("/type-tad/option");
    return response.data;
  } catch (error) {
    console.error("Error from service getTypeTadOptions: ", error);
    throw error;
  }
}
