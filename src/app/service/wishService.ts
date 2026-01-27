import axios from "axios";
import {IWish} from "@/app/interface/IWish";
import {IRes} from "@/app/interface/IRes";

const baseUrl = 'http://localhost:4000/'

const apiService = axios.create({baseURL:baseUrl});

export const wishes ={
    base: 'wishes',
    byId:(id:number | string) => `wishes/${id}`
}

const wishService ={
    getAll: ():IRes<IWish[]> => apiService.get(wishes.base),
    getById: (id:number | string):IRes<IWish> => apiService.get(wishes.byId(id)),
    create: (wish:IWish)=> apiService.post(wishes.base, wish),
    update: (id:number | string, wish:IWish):IRes<IWish> => apiService.put(wishes.byId(id), wish),
    delete: (id: number) => apiService.delete(wishes.byId(id))
}

export default wishService
