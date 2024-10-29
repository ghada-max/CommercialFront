import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProductServiceService } from '../../Services/product-service.service';
import { NgFor, NgIf } from '@angular/common';
import { MatOption, MatOptionModule } from '@angular/material/core';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-product-modal',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule,NgIf,MatFormField,MatOption,MatSelect,MatLabel,ReactiveFormsModule,MatTableModule,MatIconModule,MatSelectModule,NgFor, MatOptionModule],

  templateUrl: './product-modal.component.html',
  styleUrl: './product-modal.component.css'
})
export class ProductModalComponent implements OnInit {
  categoryList: { id: number; name: string }[] = []; // Ensure correct typing
  ngOnInit(): void {
    this.print()
    this.getAllCategorys()
}
getAllCategorys(){
  this.productServ.getAllCategorys().subscribe((response:any)=>{
    console.log(response)
    this.categoryList=response
  },(error)=>{
    console.log(error)
  })
}
 state: boolean | undefined;
  productForm: FormGroup 
  constructor(public dialogRef: MatDialogRef<ProductModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      product: {
        id:number,
        category: { id: number, name: string };
        designation: string;
        details: string;
        htt: number;
        name: string;
        price: number;
        quantity: number;
        ttc: number;
      };
      isEditMode: boolean;
    }
  )  {

    this.state=data.isEditMode
    this.productForm=new FormGroup({
      id:new FormControl(data.product.id || ""),
      category: new FormControl({
        id: data.product.category.id,
        name: data.product.category.name
      }),
            designation:  new FormControl(data.product.designation || ""), // Initialize with data

      details:new FormControl(data.product.details || ""), 
      htt:new FormControl(data.product.htt || ""), 
      name: new FormControl(data.product.name || ""), 
      price: new FormControl(data.product.price || ""), 
      quantity: new FormControl(data.product.quantity || ""), 
      ttc: new FormControl(data.product.ttc || "")

    })

  

  }
  print(){
    console.log("hemloo")
    console.log(this.state)
    console.log(this.productForm.get('id')?.value);
  }
  productServ=inject(ProductServiceService)
  addProduct(){
    this.productServ.AddProduct(this.productForm.value).subscribe((response:any)=>{
      console.log(response)
    },(error)=>{
       console.log(error)
    })
  }
  editProduct(){
    console.log(this.productForm.get('id')?.value);

    this.productServ.EditProduct(this.productForm.get('id')?.value,this.productForm.value).subscribe((response:any)=>{
      console.log(response)
    },(error)=>{
       console.log(error)
    })
  }
}
