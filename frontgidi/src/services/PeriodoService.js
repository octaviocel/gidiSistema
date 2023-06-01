import httpClient from "./HttpClient";

const prefix ='/periodo'

export default class PeriodoService{

    static async create(data){
        return (await httpClient.post(prefix,data)).data;
    }

    static async getPeriodoxId(id){
        return (await httpClient.get(`${prefix}/coleccion/${id}`)).data;
    }


}