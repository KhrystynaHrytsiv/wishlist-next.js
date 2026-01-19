import axios from "axios";
import {IWish} from "@/app/interface/IWish";
import {IRes} from "@/app/interface/IRes";

const baseUrl = 'http://localhost:3000/'

const apiService = axios.create({baseURL:baseUrl});

const wishService ={
    getAll: ():IRes<IWish[]> => apiService.get(`wishes`),
    getById: (id:number):IRes<IWish> => apiService.get(`wishes/${id}`),
    create: (wish:IWish)=> apiService.post(`wishes/`, wish),
    update: (id:number, wish:IWish):IRes<IWish> => apiService.put(`wishes/${id}`, wish),
    delete: (id: number) => apiService.delete(`wishes/${id}`)
}

export default wishService