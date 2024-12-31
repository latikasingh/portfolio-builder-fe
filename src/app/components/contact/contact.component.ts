import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IAboutDto } from '../../modals/about.modal';
import {
  selectWebsiteAboutData,
  selectWebsiteUser,
} from '../../store/website/user/user.selector';
import { IUser } from '../../modals/user.modal';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  aboutData$: Observable<IAboutDto>;
  user$: Observable<IUser>;

  constructor(
    private fb: FormBuilder,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.aboutData$ = this.store.select(selectWebsiteAboutData);
    this.user$ = this.store.select(selectWebsiteUser);

    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  sendMessage() {
    this.contactForm.reset();
  }
}
