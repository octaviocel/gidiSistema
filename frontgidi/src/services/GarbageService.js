import httpClient from "./HttpClient"

const prefix = '/residuo'

export default class GarbageService{
    static async create (data){
        return (await httpClient.post(prefix,data)).data;
    }

    static async getAll(){
        return (await httpClient.get(prefix)).data;
    }

    static async update(id,data){
        return (await httpClient.put(`${prefix}/${id}`,data)).data;
    }

    static async deleteGarbage(id){
        return (await httpClient.delete(`${prefix}/${id}`)).data;
    }
}