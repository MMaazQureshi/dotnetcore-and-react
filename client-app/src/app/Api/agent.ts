import axios, { AxiosResponse } from 'axios'
import { IActivity } from '../models/Activity';

axios.defaults.baseURL = 'http://localhost:5000/api';

const responseBody = (response:AxiosResponse)=>response.data;
const sleep =(duration:number)=>(response:AxiosResponse)=>
new Promise<AxiosResponse>(resolve=>setTimeout(()=>resolve(response),duration))
const requests={
get : (url:string) => axios.get(url).then(sleep(1000)).then(responseBody),
post : (url:string ,body:{}) => axios.post(url,body).then(sleep(1000)).then(responseBody),
put : (url:string ,body:{}) => axios.put(url,body).then(sleep(1000)).then(responseBody),
delete : (url:string) => axios.delete(url).then(sleep(1000)).then(responseBody),

}
const Activities ={
    list : () :Promise<IActivity[]> => requests.get('Activities'),
    details :(id:string) => requests.get(`Activities/${id}`),
    create :(activity: IActivity) =>requests.post('Activities',activity),
    update : (id:string,activity: IActivity) => requests.put(`Activities/${id}`,activity),
    delete:(id:string)=>requests.delete(`Activities/${id}`)
}
export default {
    Activities
}