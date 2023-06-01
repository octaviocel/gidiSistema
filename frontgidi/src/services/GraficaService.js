import httpClient from "./HttpClient";

const prefix = "/grafica";

export default class GraficaService {
  static async getGrafica(id) {
    return (await httpClient.get(`${prefix}/${id}`)).data;
  }

  static async getSumaGrafica(id) {
    return (await httpClient.get(`${prefix}/suma/${id}`)).data;
  }

  static async getCSV(id) {
    return (await httpClient.get(`${prefix}/csv/${id}`,{responseType:'blob'})).data;
  }

  static async getCSVXdia(id) {
    return (await httpClient.get(`${prefix}/csv2/${id}`,{responseType:'blob'})).data;
  }
}
