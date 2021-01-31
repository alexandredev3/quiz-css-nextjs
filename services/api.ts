import axios, { Method } from 'axios';

interface IApi {
  baseURL?: string;
  url: string;
  method: Method;
}

export default async function api({
  baseURL,
  url,
  method,
}: IApi): Promise<any> {
  const apiAxios = axios.create({
    baseURL: baseURL || '/api',
  });

  const response = await apiAxios({
    method,
    url,
  });

  return response;
}
