import axios from 'axios';

const productionURL = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/`;
const developmentURL = process.env.NEXT_PUBLIC_VERCEL_URL;

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development' ? developmentURL : productionURL,
});

export default api;
