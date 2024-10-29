import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormGroupName, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthServiceService } from '../../Services/auth-service.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],  // Use HttpClientModule here
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });
  authServ=inject(AuthServiceService);
 router=inject(Router)
   register(){
     this.authServ.register(this.registerForm.value).subscribe((token:any) =>{

      alert('Login successfully');
      console.log('Received Token:', token);
      localStorage.setItem('token', token);  // Save token if needed
      this.router.navigateByUrl('dashboard');
     },(error)=>{
      console.error('register error:', error);
      console.log('Form Value:', this.registerForm.value); // Print form value
    })
   }



}
