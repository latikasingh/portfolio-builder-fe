import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IUser } from '../../modals/user.modal';
import { selectAuthUser } from '../../store/auth/auth.selector';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  authUser$: Observable<IUser>;
  userForm: FormGroup;

  constructor(
    private store: Store,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.authUser$ = this.store.select(selectAuthUser);
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      tags: this.fb.array(['test', 'test2']),
      socialMedia: this.fb.array([]),
    });
  }

  get tags(): FormArray {
    return this.userForm.get('tags') as FormArray;
  }

  // Getter for socialMedia FormArray
  get socialMedia(): FormArray {
    return this.userForm.get('socialMedia') as FormArray;
  }
}
