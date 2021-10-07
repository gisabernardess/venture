import axios from 'axios';
import { parseCookies } from 'nookies';
import { config } from '../config';

export function getAPIClient(ctx?: any) {
  const { ['venture.token']: token } = parseCookies(ctx);

  const api = axios.create({
    baseURL: config.baseUrl,
  });

  //shows the information for each request
  // api.interceptors.request.use((config) => {
  //   console.log(config);
  //   return config;
  // });

  if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
  }

  return api;
}
