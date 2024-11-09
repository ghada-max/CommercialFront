import { Component, OnInit, inject } from '@angular/core';
import { DevisService } from '../../Services/devis.service';
import { ProductServiceService } from '../../Services/product-service.service';
import { ProductsComponent } from '../products/products.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgFor, NgIf } from '@angular/common';
import { MatOption, MatOptionModule } from '@angular/material/core';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { product } from '../../interfaces/product';
interface Category {
  id: number;
  name: string;
}
@Component({
  selector: 'app-devis',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule,NgIf,MatFormField,MatOption,MatSelect,MatLabel,ReactiveFormsModule,MatTableModule,MatIconModule,MatSelectModule,NgFor, MatOptionModule],
  templateUrl: './devis.component.html',
  styleUrl: './devis.component.css'
})
export class DevisComponent implements OnInit {
  filterdCategory: Category[] = []; // For holding unique categories
  productList:product[]=[]
  filteredProductList:product[]=[]
  productById:any
  listCategory: Category[] = []; // For holding unique categories
  devisList:[]=[]
  ID:any
  productServ=inject(ProductServiceService)
  productForm: FormGroup = new FormGroup({
    category: new FormControl({ id: null, name: '' }), // Initialize with category object
    designation: new FormControl(""), // Initialize with data

    details: new FormControl(""),
    htt: new FormControl(""),
    name: new FormControl(""),
    price: new FormControl(""),
    quantity: new FormControl(""),
    ttc: new FormControl("")

  })
  ngOnInit(): void {
    this.getAllDevis()
    this.getAllCategorys()
    this.getProducts()
  }

  devisServ=inject(DevisService)

  getProducts() {
    this.productServ.getAllProducts().subscribe((response: any) => {
      this.productList = response
      this.filteredProductList=response
      //map.tgis product list to the one who 
      this.productList.forEach((product) => {
        console.log(product.category.name || "No Category");
      });     
       console.log(this.filteredProductList)

    }, (error) => {
      console.log(error)
    })
  }
  getAllCategorys(){
    this.productServ.getAllCategorys().subscribe((response:any)=>{
      this.listCategory=response
      console.log(this.listCategory)

    },(error)=>{
      console.log(error)

    })
  }
  //  console.log(this.producComp.getUniqueCategories)  }

  getAllDevis(){
     this.devisServ.GetAllDevis().subscribe((response:any)=>{
     this.devisList=response
     },(error)=>{
      console.log(error)
     })
  }

  filterCategories(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filterdCategory = this.listCategory.filter(category =>
      category.name.toLowerCase().includes(inputValue)
    );
  }

  filterByCategory(selectedCategory:{id:number,name:string}){
    if(selectedCategory){
      this.filteredProductList=this.productList.filter(product=>
        product.category.name===selectedCategory.name);
      //  console.log(this.filteredProductList)
      
    }else{
      this.filteredProductList=this.productList
    }
  }
  filterByProduct(prod:any){
    this.ID=prod
    console.log(this.ID.id)
    this.productServ.findProductById(this.ID.id).subscribe((response:any)=>{
      this.productById=response
      console.log(this.productById)
    },(error)=>{
      console.log(error)
    })
  }
  }
 
