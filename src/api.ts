import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: 'https://localhost:7134',
});

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const request = <T>(
  method: string,
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
): Promise<T> => {
  const token = localStorage.getItem('token');
  if (token) {config = { headers: { Authorization: `Bearer ${token}` }}}
  return axiosInstance.request<T>({
    method,
    url,
    data,
    ...config,
  }).then(response => response.data).catch(error => { throw error; });
};

const get = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  return request<T>('get', url, undefined, config);
};

const post = async <T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
): Promise<T> => {
  return request<T>('post', url, data, config );
};

const put = async <T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
): Promise<T> => {
  return request<T>('put', url, data, config);
};

const remove = async <T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
): Promise<T> => {
  return request<T>('delete', url, data, config);
};

const patch = async <T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
): Promise<T> => {
  return request<T>('patch', url, data, config);
};

export { get, post, put, remove, patch };
