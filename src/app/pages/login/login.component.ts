import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthServiceService } from '../../Services/auth-service.service';
//14k56
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink,RouterOutlet],  // Use HttpClientModule here
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], // Correction: 'styleUrls' au lieu de 'styleUrl'
})
export class LoginComponent {
  userForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  authServ=inject(AuthServiceService);
  router = inject(Router);

  login() {
    this.authServ.login(this.userForm.value).subscribe(
      (token: any) => {
        alert('Login successfully');
        console.log('Received Token:', token);
        localStorage.setItem('token', token);  // Save token if needed
        this.router.navigateByUrl('dashboard');
      },
      (error) => {
        alert('Invalid credentials');

        console.error('Login error:', error);
      }
    );
  }
  Register(){
    this.router.navigateByUrl('register');

  }
}
