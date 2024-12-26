import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { login, signup } from '../../store/auth/auth.action';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { passwordRegex } from '../../regex';
import { InputComponent } from '../../formcomponents/input/input.component';
import { SpinnerComponent } from '../spinner/spinner.component';
import { Observable } from 'rxjs';
import { selectAuthLoading } from '../../store/auth/auth.selector';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputComponent,
    SpinnerComponent,
    CommonModule,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent implements OnInit {
  @ViewChild('container') container!: ElementRef;
  loginForm!: FormGroup;
  signupForm!: FormGroup;
  loading$: Observable<boolean>;

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    if (this.authService.getUserToken()) {
      this.router.navigate(['settings']);
    }

    this.loading$ = this.store.select(selectAuthLoading);
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(passwordRegex)]],
    });

    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(passwordRegex)]],
    });
  }

  showSignIn() {
    this.signupForm.reset();
    this.container.nativeElement.classList.remove('right-panel-active');
  }

  showSignUp() {
    this.loginForm.reset();
    this.container.nativeElement.classList.add('right-panel-active');
  }

  onSignup() {
    const formData = this.signupForm.value;
    console.log(formData);

    this.store.dispatch(
      signup({
        payload: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        },
      }),
    );
  }

  onLogin() {
    const formData = this.loginForm.value;
    console.log(formData);
    this.store.dispatch(
      login({ email: formData.email, password: formData.password }),
    );
  }
}
