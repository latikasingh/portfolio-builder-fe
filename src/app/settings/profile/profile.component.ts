import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ISocialMedia, IUser } from '../../modals/user.modal';
import {
  selectAuthUser,
  selectAuthUserLoading,
} from '../../store/auth/auth.selector';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  authUser$: Observable<IUser>;
  loading$: Observable<boolean>;
  userForm: FormGroup;

  constructor(
    private store: Store,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.authUser$ = this.store.select(selectAuthUser);
    this.loading$ = this.store.select(selectAuthUserLoading);
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      tags: this.fb.array(['test', 'test2']),
      socialMedia: this.fb.array([]),
    });
  }

  get tags(): string[] {
    return this.userForm.get('tags').value;
  }

  get socialMedia(): ISocialMedia[] {
    return this.userForm.get('socialMedia').value;
  }

  onRemoveTag(index: number) {
    const tagsArray = this.userForm.get('tags') as FormArray;

    if ((tagsArray ?? []).length) {
      tagsArray.removeAt(index);
    } else {
      console.error('Tags is not a FormArray:', tagsArray);
    }
  }
}
