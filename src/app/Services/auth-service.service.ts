import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  LoginAPIurl="http://localhost:8081/api/auth/login";
  RegisterAPIurl="http://localhost:8081/api/auth/register";
  APIurl="http://localhost:8081";

  constructor(private http:HttpClient) { }

  login(data:any){
     return this.http.post(this.LoginAPIurl,data,{responseType:'text'});
  }

  register(data:any){
    return this.http.post(this.RegisterAPIurl,data);
  }
}
