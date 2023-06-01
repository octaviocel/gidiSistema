import httpClient from "./HttpClient.js";

const prefix = "/gallery";

export default class Galleryervice {
  static async create(gallery) {
    return (await httpClient.post(`${prefix}`, gallery)).data;
  }

  static async getGalleryPublic(id) {
    return (await httpClient.get(`${prefix}-principales`)).data;
  }

  static async getGallery(id) {
    return (await httpClient.get(`${prefix}/getById/${id}`)).data;
  }

  static async getAllGallery() {
    return (await httpClient.get(prefix)).data;
  }

  static async updateGallery(id, gallery) {
    return (await httpClient.put(`${prefix}/${id}`, gallery)).data;
  }

  static async deleteGallery(id) {
    return (await httpClient.delete(`${prefix}/${id}`)).data;
  }
}
