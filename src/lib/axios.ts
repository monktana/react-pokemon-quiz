import * as Sentry from "@sentry/react";
import Axios from 'axios';

import { API_URL } from '@/config';

export const axios = Axios.create({
  baseURL: `${API_URL}`,
});

axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    Sentry.captureException(error);
    return Promise.reject(error);
  }
);
