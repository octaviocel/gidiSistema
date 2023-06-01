import httpClient from "./HttpClient.js";

const prefix = "/blog";

export default class BlogService {
  static async create(blog) {
    return (await httpClient.post(`${prefix}`, blog)).data;
  }

  static async getPrincipales() {
    return (await httpClient.get(`${prefix}-principales`)).data;
  }

  static async getPagination(currentPage) {
    return (
      await httpClient.get(`${prefix}-pagination/${currentPage}`)
    ).data;
  }

  static async getBlog(id) {
    return (await httpClient.get(`${prefix}/getById/${id}`)).data;
  }

  static async getAllBlogs() {
    return (await httpClient.get(prefix)).data;
  }

  static async updateBlog(id, blog) {
    return (await httpClient.put(`${prefix}/${id}`, blog)).data;
  }

  static async updatePrincipal(id, blog) {
    return (await httpClient.put(`${prefix}-principal/${id}`, blog)).data;
  }

  static async deleteBlog(id) {
    return (await httpClient.delete(`${prefix}/${id}`)).data;
  }
}
