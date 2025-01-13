import axios from "axios";
import useTheme from "@/stores/theme";
import { handleAxiosError } from "@/utils/handle-axios-error";
import { sanitizeData, sanitizeUrl } from "@/utils/sanitize-data";
import { getCookies } from "@/utils/cookie";

const createAxiosInstance = () => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  instance.interceptors.request.use(
    async (config) => {
      useTheme.getState().setLoading(true);
      const token = await getCookies("token");

      // Sanitize URL if present (both path and query parameters)
      if (config.url) {
        config.url = sanitizeUrl(config.url);
      }

      // Sanitize request params if present
      if (config.params) {
        config.params = sanitizeData(config.params);
      }

      // Sanitize request data if present
      if (
        config.data &&
        config.headers["Content-Type"] === "application/json"
      ) {
        config.data = sanitizeData(config.data);
      }

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      console.error("Request error:", error);
      return Promise.reject(new Error(error));
    },
  );

  instance.interceptors.response.use(
    (response) => {
      useTheme.getState().setLoading(false);
      return response;
    },
    async (error) => {
      useTheme.getState().setLoading(false);
      const errorResponse = await handleAxiosError(error);
      return Promise.reject(errorResponse);
    },
  );
  return instance;
};

const api = createAxiosInstance();

export default api;
