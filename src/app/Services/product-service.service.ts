import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  APIurl="http://localhost:8081/products";
  APIurlC="http://localhost:8081/category";

  constructor(private http:HttpClient) { }
getAllCategorys(){
  return this.http.get(this.APIurlC+"/getAllCategorys")

}

getAllProducts(){
  return this.http.get(this.APIurl+"/getAllProducts")
}


AddProduct(data:any){
  return this.http.post(this.APIurl+"/createProduct",data)
}

  EditProduct(id:any,data:any){
    return this.http.put(`${this.APIurl}/updateProduct/${id}`,data);
  }
    DeleteProduct(id:any){
      return this.http.delete(`${this.APIurl}/deleteProduct/${id}`,{responseType:"text"});
     
  }
  findProductById(id:any){
    return this.http.get(`${this.APIurl}/getProduct/${id}`);
  }
}



