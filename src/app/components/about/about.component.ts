import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IAboutDto } from '../../modals/about.modal';
import { Store } from '@ngrx/store';
import {
  selectWebsiteAboutData,
  selectWebsiteUser,
} from '../../store/website/user/user.selector';
import { IUser } from '../../modals/user.modal';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent implements OnInit {
  aboutData$: Observable<IAboutDto>;
  userData$: Observable<IUser>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.aboutData$ = this.store.select(selectWebsiteAboutData);
    this.userData$ = this.store.select(selectWebsiteUser);
  }
}
