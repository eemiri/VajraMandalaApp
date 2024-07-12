import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string;
  password: string;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.signIn(this.email, this.password).subscribe(
      (user) => {
        console.log('Logged in successfully', user);
        this.router.navigate(['/home']);  // Navigate to the home page or dashboard
      },
      (error) => {
        console.error('Login error', error.message);
        alert(error.message);
      }
    );
  }
}
