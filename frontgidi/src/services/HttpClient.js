import axios from "axios";
import SecureLS from "secure-ls";
import { _BaseUrl } from "../utils/constants";

const ls = new SecureLS({ encodingType: "aes" });

const httpClient = axios.create({
  baseURL: _BaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.request.use(
  function (config) {
    const token = ls.get("_token");
    //console.log(token)
    config.headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      config.headers = {
        "Content-Type": "application/json",
        "auth-token": JSON.parse(token),
      };
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    //console.log(error)
    if (error.response) {
      const status = error.response.status;
      if (status === 401) {
        ls.removeAll();
      }
      return Promise.reject(error.response.data);
    } else {
      return Promise.reject({
        status: 500,
        message: "Error de conexión con el servidor.",
      });
    }
  }
);

const httpFormDataClient = axios.create({
  baseURL: _BaseUrl,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

httpFormDataClient.interceptors.request.use(
  function (config) {
    const token = ls.get("_token");
    config.headers = {
      "Content-Type": "multipart/form-data",
    };

    if (token) {
      config.headers = {
        "Content-Type": "multipart/form-data",
        "auth-token": JSON.parse(token),
      };
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export { httpFormDataClient };

export default httpClient;

