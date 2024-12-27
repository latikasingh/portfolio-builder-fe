import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAuthUserLoading } from '../store/auth/auth.selector';
import { CommonModule } from '@angular/common';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { MainModule } from '../components/main.module';
import { ActivatedRoute } from '@angular/router';
import {
  getWebsiteAboutData,
  getWebsiteUserData,
  setUserId,
} from '../store/website/user/user.action';
import { selectWebsiteLoading } from '../store/website/user/user.selector';
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [MainModule, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  animations: [fadeInOnEnterAnimation()],
})
export class MainComponent implements OnInit {
  userId: string;
  userLoading$: Observable<boolean>;
  websiteLoading$: Observable<boolean>;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];
    this.store.dispatch(setUserId({ id: this.userId }));

    this.userLoading$ = this.store.select(selectAuthUserLoading);
    this.websiteLoading$ = this.store.select(selectWebsiteLoading);
    this.store.dispatch(getWebsiteUserData({ id: this.userId }));
    this.store.dispatch(getWebsiteAboutData({ id: this.userId }));
  }

  scrollToSection(sectionId: string): void {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
