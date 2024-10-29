import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  APIurl="http://localhost:8081/company";

  constructor(private http:HttpClient) { }
  getCompanyDetails(){
      return this.http.get(this.APIurl+"/getCompany")
    }
  
    updateCompanyDetails(data:any){
      return this.http.put(this.APIurl+"/updateCompany",data)
    }
}
