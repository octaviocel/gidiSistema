import httpClient from "./HttpClient"

const prefix = "/recoleccion"

export default class RecoleccionService{

    static async create(data){
        return (await httpClient.post(prefix,data)).data;
    }

    static async getAllRecolecciones(){
        return (await httpClient.get(prefix)).data;
    }

    static async deleteRecoleccion(id){
        return (await httpClient.delete(`${prefix}/${id}`)).data;
    }
}