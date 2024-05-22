import ky from 'ky';

import { API_URL } from '@/config';

export const apiClient = ky.create({
  prefixUrl: API_URL,
  retry: 3,
  timeout: 10000,
});
