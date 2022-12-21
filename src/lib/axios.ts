import Axios from "axios";

import { API_URL, API_VERSION } from "@/config";

export const axios = Axios.create({
  baseURL: `${API_URL}/${API_VERSION}`
});

axios.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    return Promise.reject(error);
  }
)