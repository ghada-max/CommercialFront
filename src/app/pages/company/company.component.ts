import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CompanyService } from '../../Services/company.service';
import { company } from '../../interfaces/company';
import { MatDialog } from '@angular/material/dialog';
import { CompanyModalComponent } from '../company-modal/company-modal.component';

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink,RouterOutlet],  // Use HttpClientModule here
  templateUrl: './company.component.html',
  styleUrl: './company.component.css'
})

export class CompanyComponent implements OnInit {
  companyDetails:company[]=[]
  companyForm:FormGroup=new FormGroup({
   crn: new FormControl(''),
   creationDate: new FormControl(''),
   lastModifDate: new FormControl(''),
   specifiedIn: new FormControl(''),
   address: new FormControl(''),
   denomination: new FormControl(''),
   email: new FormControl(''),
   fax: new FormControl(''),
   inChargeOf: new FormControl(''),
   phone: new FormControl(''),
   balance: new FormControl('') 
  })
     
  ngOnInit(): void { 
    
    this.getCompany();
  }

  companyServ=inject(CompanyService)
 
  getCompany(){
    this.companyServ.getCompanyDetails().subscribe((response:any)=>{
      this.companyDetails=response;
      const balance = response.Balance;
      this.companyForm.patchValue({
      crn: response.CRN,
      creationDate: response.CreationDate,
      lastModifDate: response.LastModifDate,
      specifiedIn: response.SpecifiedIn,
      address: response.address,
      denomination: response.denomination,
      email: response.email,
      fax: response.fax,
      inChargeOf: response.inChargeOf,
      phone: response.phone,
      balance: response.Balance 
      })
      console.log(this.companyForm.value);
    },(error)=>{
      console.log(error)
      const token = localStorage.getItem('token');
      console.log(token)
    })
  }
  dialog=inject(MatDialog);
  openUpdateDialog() {
    const dialogRef = this.dialog.open(CompanyModalComponent, {
      data: this.companyForm.value // Pass current form values to the dialog
    });

    
  }



}
