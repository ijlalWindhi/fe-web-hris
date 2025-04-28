import axios from "@/lib/axios";
import {
  IResponse,
  IResponseListTalentMonitoring,
  IResponseTalentInformation,
  IResponseTalentMapping,
  IResponseContract,
  IResponseAttendance,
  IResponseTimesheet,
  IResponsePerformance,
  IResponsePayroll,
  TPayloadUpdatePerformance,
  TSearchParams,
  IParamsSearch,
} from "@/types";

export async function getListTalentMonitor(
  params?: TSearchParams,
): Promise<IResponse<IResponseListTalentMonitoring[]>> {
  try {
    const response = await axios.get<
      IResponse<IResponseListTalentMonitoring[]>
    >("/talent-monitor/list", {
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Error from service getListTalentMonitor: ", error);
    throw error;
  }
}

export async function getTalentInformation(
  id: string,
): Promise<IResponse<IResponseTalentInformation>> {
  try {
    const response = await axios.get<IResponse<IResponseTalentInformation>>(
      `/talent-monitor/information/${id}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error from service getTalentInformation: ", error);
    throw error;
  }
}

export async function getTalentMapping(
  id: string,
): Promise<IResponse<IResponseTalentMapping>> {
  try {
    const response = await axios.get<IResponse<IResponseTalentMapping>>(
      `/talent-monitor/talent-mapping/${id}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error from service getTalentMapping: ", error);
    throw error;
  }
}

export async function getContract(
  id: string,
): Promise<IResponse<IResponseContract>> {
  try {
    const response = await axios.get<IResponse<IResponseContract>>(
      `/talent-monitor/contract/${id}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error from service getContract: ", error);
    throw error;
  }
}

export async function getAttendance({
  talent_id,
  start_date,
  end_date,
}: IParamsSearch): Promise<IResponse<IResponseAttendance>> {
  try {
    const response = await axios.get<IResponse<IResponseAttendance>>(
      `/talent-monitor/attendance/${talent_id}`,
      {
        params: {
          start_date,
          end_date,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error from service getAttendance: ", error);
    throw error;
  }
}

export async function approveLeave(id: string): Promise<IResponse<null>> {
  try {
    const response = await axios.put<IResponse<null>>(
      `/talent-monitor/leave/approve/${id}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error from service approveLeave: ", error);
    throw error;
  }
}

export async function rejectLeave(id: string): Promise<IResponse<null>> {
  try {
    const response = await axios.put<IResponse<null>>(
      `/talent-monitor/leave/reject/${id}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error from service rejectLeave: ", error);
    throw error;
  }
}

export async function getTimesheet({
  talent_id,
  start_date,
  end_date,
}: IParamsSearch): Promise<IResponse<IResponseTimesheet>> {
  try {
    const response = await axios.get<IResponse<IResponseTimesheet>>(
      `/talent-monitor/timesheet/${talent_id}`,
      {
        params: {
          start_date,
          end_date,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error from service getTimesheet: ", error);
    throw error;
  }
}

export async function getPerformance(
  id: string,
): Promise<IResponse<IResponsePerformance>> {
  try {
    const response = await axios.get<IResponse<IResponsePerformance>>(
      `/talent-monitor/performance/${id}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error from service getPerformance: ", error);
    throw error;
  }
}

export async function getPayroll(
  id: string,
): Promise<IResponse<IResponsePayroll>> {
  try {
    const response = await axios.get<IResponse<IResponsePayroll>>(
      `/talent-monitor/payroll/${id}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error from service getPayroll: ", error);
    throw error;
  }
}

export async function updatePerformance(
  id: number,
  payload: TPayloadUpdatePerformance,
): Promise<IResponse<null>> {
  try {
    const response = await axios.put<IResponse<null>>(
      `/talent-monitor/performance/${id}`,
      payload,
    );
    return response.data;
  } catch (error) {
    console.error("Error from service updatePerformance: ", error);
    throw error;
  }
}

export async function resetDevice(id: string): Promise<IResponse<null>> {
  try {
    const response = await axios.post<IResponse<null>>(
      `/talent-monitoring/reset-device/${id}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error from service resetDevice: ", error);
    throw error;
  }
}
