import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';

class ApiService {
  private static axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api/',
  });

  static async request<T>(config: AxiosRequestConfig, showError = false) {
    try {
      const { data } = await ApiService.axiosInstance.request<T>(config);

      return data;
    } catch (error: any) {
      console.log(error);

      if (showError) {
        const errorData = error?.response?.data || error?.error;

        throw new Error(errorData?.message || errorData);
      }
    }
  }
}

export default ApiService;
