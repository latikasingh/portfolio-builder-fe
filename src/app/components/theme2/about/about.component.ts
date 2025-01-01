import { Component, OnInit } from '@angular/core';
import {
  selectWebsiteAboutData,
  selectWebsiteUser,
} from '../../../store/website/user/user.selector';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IAboutDto } from '../../../modals/about.modal';
import { IUser } from '../../../modals/user.modal';

@Component({
  selector: 'app-theme2-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent implements OnInit {
  aboutData$: Observable<IAboutDto>;
  user$: Observable<IUser>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.user$ = this.store.select(selectWebsiteUser);
    this.aboutData$ = this.store.select(selectWebsiteAboutData);
  }
}
