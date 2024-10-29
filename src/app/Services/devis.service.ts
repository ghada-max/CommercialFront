import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DevisService {
  APIurl="http://localhost:8081/devis";

  constructor(private http:HttpClient) { }


  
  GetAllDevis(){
    return this.http.get(this.APIurl+"/getAllDevis")
  }

}
