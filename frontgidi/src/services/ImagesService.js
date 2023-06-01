import httpClient, { httpFormDataClient } from "./HttpClient";

const prefix = "/imagenes";

export default class ImagesService {
  static async create(file) {
    let data = new FormData();
    data.append("foto", file);

    return (await httpFormDataClient.post(prefix, data)).data;
  }

  static async get(key) {
    return (await httpFormDataClient.get(prefix + "/" + key)).data;
  }

  static async delete(key) {
    return (await httpClient.delete(prefix + "/" + key)).data;
  }
}
