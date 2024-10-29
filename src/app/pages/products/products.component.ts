import { Component, NgModuleRef, OnInit, TemplateRef, ViewChild, inject, viewChild } from '@angular/core';
import { MatOption, MatOptionModule } from '@angular/material/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ProductServiceService } from '../../Services/product-service.service';
import { product } from '../../interfaces/product';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { NgFor, NgIf } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProductModalComponent } from '../product-modal/product-modal.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgIf,MatPaginatorModule, MatFormField, MatOption, MatSelect, MatLabel, MatDialogModule, ReactiveFormsModule, MatTableModule, MatIconModule, MatSelectModule, NgFor, MatOptionModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  @ViewChild('confirmDialog') confirmDialog!: TemplateRef<any>; // Access the modal template
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  isEditMode: boolean = true
  isEditing: boolean = false
  displayedColumns: string[] = ['name', 'designation', 'details', 'price', 'quantity', 'category', 'ttc', 'htt', 'Action']
  datasource: any
  isDeleteMode: boolean = false
  productList: product[] = []
  uniqueCategories: string[] = []; // For holding unique categories
  productServ = inject(ProductServiceService)
  dialog = inject(MatDialog)
  ngOnInit(): void {
    this.getProducts()
    this.datasource.paginator = this.paginator;

  }
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

  getProducts() {
    this.productServ.getAllProducts().subscribe((response: any) => {
      this.productList = response
      this.uniqueCategories = this.getUniqueCategories(response)
      console.log(this.uniqueCategories)
      this.datasource = new MatTableDataSource(response)
      //this.productList=response
      console.log(response)
    }, (error) => {
      console.log(error)
    })
  }

  getUniqueCategories(products: product[]): string[] {
    return [...new Set(products.map(product => product.category.name))];
  }

  filterByCategory(selectedCategory: string) {
    if (selectedCategory) {
      this.datasource.data = this.productList.filter(product => product.category.name === selectedCategory);
    } else {
      this.datasource.data = this.productList; // Reset to show all products
    }
  }
  onEditMode(product: any) {
    this.isEditMode = true
    const dialogRef = this.dialog.open(ProductModalComponent, {
      data: { product, isEditMode: this.isEditMode }, // Pass both product and mode
    })
    console.log(product)

  }
  onDeleteId: number = 0
  onDelete(element: number) {
    this.isDeleteMode = true
    console.log('isDeleteMode:', this.isDeleteMode); // Should log true
    const dialogRef = this.dialog.open(this.confirmDialog);
    console.log(element)
    this.onDeleteId = element
  }
  onAddProduct() {
    this.isEditMode = false

    const dialogRef = this.dialog.open(ProductModalComponent, {
      data: {
        product: this.productForm.value,
        isEditMode: this.isEditMode,
      }
    })


  }
  cancel() {
     this.dialog.closeAll()

   }
  onConfirm() {
    // console.log(this.onDeleteId)
    this.productServ.DeleteProduct(this.onDeleteId).subscribe((response: any) => {
      alert(response)
      window.location.reload();

    }, (error) => {
      alert(error)

      console.log(error)
    })

  }
}