import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IUser } from '../../../modals/user.modal';
import {
  selectWebsiteAboutData,
  selectWebsiteUser,
} from '../../../store/website/user/user.selector';
import { IAboutDto } from '../../../modals/about.modal';

@Component({
  selector: 'app-theme2-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent implements OnInit {
  userData$: Observable<IUser>;
  aboutData$: Observable<IAboutDto>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.userData$ = this.store.select(selectWebsiteUser);
    this.aboutData$ = this.store.select(selectWebsiteAboutData);
  }
}
