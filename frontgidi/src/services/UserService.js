import httpClient from "./HttpClient.js";

const prefix = "/user";

export default class UserService {
  static async create(user) {
    return (await httpClient.post(`${prefix}`, user)).data;
  }

  static async login(email, password) {
    return (await httpClient.post(`/auth${prefix}`, { email, password })).data;
  }

  static async getUser(id) {
    return (await httpClient.get(`${prefix}/getById/${id}`)).data;
  }

  static async getAllUsers() {
    return (await httpClient.get(prefix)).data;
  }

  static async updateUser(id, user) {
    return (await httpClient.put(`${prefix}/${id}`, user)).data;
  }

  static async deleteUser(id) {
    return (await httpClient.delete(`${prefix}/${id}`)).data;
  }
}
