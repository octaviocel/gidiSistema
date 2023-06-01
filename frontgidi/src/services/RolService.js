import httpClient from "./HttpClient";

const prefix = "/roles";
export default class RolService {
  static async getRoles() {
    return (await httpClient.get(prefix)).data;
  }
}
