import httpClient from "./HttpClient";

const prefix = '/recoleccionCabecera';

export default class RecoleccionEspecificaService{
    static async create(data){
        return (await httpClient.post(prefix,data)).data;
    }

    static async getPrincipalEstadistica (id){
        return (await httpClient.get(`${prefix}/principales/${id}`)).data;
    }

    static async getRecoleccion({ubicacion, recoleccion}){
        //console.log(data)
        return (await httpClient.get(`${prefix}/${ubicacion}/${recoleccion}`)).data;
    }

    
}