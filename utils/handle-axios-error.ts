import { AxiosError } from "axios";

import { toast } from "@/hooks/use-toast";
import { IResponseMessage } from "@/types";

type NotificationType = "destructive" | "default";

const DEFAULT_ERROR_MESSAGE = "Terjadi kesalahan yang tidak diketahui.";
const NETWORK_ERROR_MESSAGE =
  "Terjadi masalah saat menghubungkan ke server. Harap periksa koneksi Anda atau hubungi admin.";

const showNotification = (
  type: NotificationType,
  message: string,
  description: string,
) => {
  toast({
    title: message,
    description,
    variant: type,
  });
};

const getErrorDescription = (error: AxiosError<IResponseMessage>): string => {
  return (
    error.response?.data?.message || error.message || DEFAULT_ERROR_MESSAGE
  );
};

const handleSpecificError = (
  status: number,
  description: string,
): { message: string; errorMessage: string } => {
  switch (status) {
    case 400:
      return { message: "Terjadi kesalahan", errorMessage: description };
    case 401:
      return {
        message: "Unauthorized",
        errorMessage: "Silakan login terlebih dahulu.",
      };
    case 403:
      return {
        message: "Forbidden",
        errorMessage: "Anda tidak memiliki izin untuk mengakses halaman ini.",
      };
    case 404:
      return { message: "Halaman Tidak Ditemukan", errorMessage: description };
    case 500:
      return {
        message: "Server Error",
        errorMessage:
          "Terjadi kesalahan pada server. Silakan hubungi admin dan coba lagi nanti.",
      };
    default:
      return { message: "Error", errorMessage: DEFAULT_ERROR_MESSAGE };
  }
};

export const handleAxiosError = async (err: AxiosError<IResponseMessage>) => {
  if (!err.response) {
    showNotification("destructive", "Masalah Jaringan", NETWORK_ERROR_MESSAGE);
    return { error: true, message: NETWORK_ERROR_MESSAGE };
  }

  const { status } = err.response;
  const description = getErrorDescription(err);
  const { message, errorMessage } = handleSpecificError(status, description);

  showNotification("destructive", message, errorMessage);

  if (status === 401) {
    // Redirect to login page
    window.location.href = "/auth/login";
  }
  return { error: true, message: errorMessage, status };
};
