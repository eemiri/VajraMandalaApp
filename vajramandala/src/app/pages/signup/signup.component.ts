import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private db: AngularFirestore,
    private fb: FormBuilder
  ) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      coursesAttended: ['', Validators.required],
      additionalInfo: ['']
    });
  }

  signup() {
    const { email, password, coursesAttended, additionalInfo } = this.signupForm.value;
    this.authService.signUp(email, password).subscribe(
      (user) => {
        // Speichere den Fragebogen in Firestore
        this.db.collection('questionnaires').doc(user.uid).set({
          userId: user.uid,
          coursesAttended: coursesAttended.split(','),
          additionalInfo,
          approved: false
        }).then(() => {
          console.log('Registration request submitted');
          this.router.navigate(['/login']);
        });
      },
      (error) => {
        console.error('Registration error', error);
      }
    );
  }
}
