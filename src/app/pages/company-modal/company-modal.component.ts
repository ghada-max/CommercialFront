import { Component, Inject, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CompanyService } from '../../Services/company.service';

@Component({
  selector: 'app-company-modal',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormField, MatInputModule], // Add modules here
  templateUrl: './company-modal.component.html',
  styleUrl: './company-modal.component.css'
})
export class CompanyModalComponent {
  companyForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CompanyModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      crn: string;
      creationDate: Date;
      lastModifDate: Date;
      specifiedIn: string;
      address: string;
      denomination: string;
      email: string;
      fax: string;
      inChargeOf: string;
      phone: string;
      balance: number;
    } // Inject the data with specific types
  )  {
    this.companyForm = new FormGroup({
      crn: new FormControl(data.crn || ""), // Initialize with data
      creationDate: new FormControl(data.creationDate || ""), // Initialize with data
      lastModifDate: new FormControl(data.lastModifDate || ""), // Initialize with data
      SpecifiedIn: new FormControl(data.specifiedIn || ""), // Initialize with data
      address: new FormControl(data.address || ""), // Initialize with data
      denomination: new FormControl(data.denomination || ""), // Initialize with data
      email: new FormControl(data.email || ""), // Initialize with data
      fax: new FormControl(data.fax || ""), // Initialize with data
      inChargeOf: new FormControl(data.inChargeOf || ""), // Initialize with data
      phone: new FormControl(data.phone || ""), // Initialize with data
      balance: new FormControl(data.balance || "") // Initialize with data
    });
  }
  companyServ=inject(CompanyService)


  updateDialog() {
    
        this.companyServ.updateCompanyDetails(this.companyForm.value)// Pass the result to the update service
          .subscribe((response: any) => {
            this.onSubmit();
            alert("Updated successfully");

          }, (error) => {
            console.log(error);
          });
      }
 



  onSubmit(): void {
    // Handle form submission
    this.dialogRef.close(this.companyForm.value); // Return the form data
    window.location.reload();

  }

  onCancel(): void {
    this.dialogRef.close(); // Close without doing anything
  }

}
