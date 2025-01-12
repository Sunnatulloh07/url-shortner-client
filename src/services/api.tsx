import axios from 'axios';
export const BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: BASE_URL,
});

export const fetchUrls = async () => {
  const { data } = await api.get('/short-urls/all');
  return data;
};

export const createShortUrl = async (data: { originalUrl: string; alias?: string; method: string }) => {
  const response = await api.post('shorten', data);
  return response.data;
};

export const getUrlAnalytics = async (shortUrl: string) => {
  const { data } = await api.get(`/analytics/${shortUrl}`);
  return data;
};

export const shortUrlRedirect = async (shortUrl: string) => {
  const { data } = await api.get(`/${shortUrl}`);
  return data;
};

export const deleteShortUrl = async (shortUrl: string) => {
  const { data } = await api.delete(`/delete/${shortUrl}`);
  return data;
};

export const shortUrlInfo = async (shortUrl: string) => {
  const { data } = await api.get(`/info/${shortUrl}`);
  return data;
};
