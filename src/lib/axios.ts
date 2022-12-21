import Axios from "axios";

import { API_URL, API_VERSION } from "@/config";

export const axios = Axios.create({
  baseURL: `${API_URL}/${API_VERSION}`
});