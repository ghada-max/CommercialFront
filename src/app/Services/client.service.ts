import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  APIurl="http://localhost:8081";

  constructor(private http:HttpClient) { }
  getAllClients(){
    return this.http.get(this.APIurl+"/client/getAllClients");
  }
  updateClient(id:any,data:any){
    return this.http.put(`${this.APIurl}/client/updateClient/${id}`, data);
  }
    AddClient(data:any){
      return this.http.post(`${this.APIurl}/client/AddClient`, data,{ 
        responseType: 'text' });  
  }

  getClientByEmail(email:string){
    return this.http.get(`${this.APIurl}/client/getClientByMail/${email}`)
  }

  deleteClient(id:any){
    return this.http.delete(`${this.APIurl}/client/deleteClient/${id}`);

  }
}
