import axios from 'axios';
import { GH_API_BASE_URL } from '@/constants';

const apiClient = axios.create({
  baseURL: GH_API_BASE_URL,
  timeout: 5000,
  headers: {
    Authorization: import.meta.env.VITE_GITHUB_TOKEN
      ? `token ${import.meta.env.VITE_GITHUB_TOKEN}`
      : undefined,
  },
});

export default apiClient;
