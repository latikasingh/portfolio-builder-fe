import { Component, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  selectAuthUser,
  selectAuthUserLoading,
} from '../store/auth/auth.selector';
import { CommonModule } from '@angular/common';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { MainModule } from '../components/main.module';
import { ActivatedRoute, Router } from '@angular/router';
import {
  getUserPortfolioData,
  setUserId,
} from '../store/website/user/user.action';
import {
  selectWebsiteLoading,
  selectWebsiteUser,
} from '../store/website/user/user.selector';
import { getActiveTheme, getThemesList } from '../store/theme/theme.action';
import { selectTheme, selectThemeList } from '../store/theme/theme.selector';
import { IconsComponent } from '../common/icons/icons.component';
import { IUser } from '../modals/user.modal';
import { IThemes } from '../modals/themes.modal';
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [MainModule, CommonModule, IconsComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  animations: [fadeInOnEnterAnimation()],
})
export class MainComponent implements OnInit {
  userId: string;
  userLoading$: Observable<boolean>;
  websiteLoading$: Observable<boolean>;
  themes$: Observable<IThemes[]>;
  websiteUser$: Observable<IUser>;
  authUser$: Observable<IUser>;
  activeTheme: IThemes;

  themes: IThemes[] = [];

  showSettings: boolean = false;

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.websiteUser$ = this.store.select(selectWebsiteUser);
    this.authUser$ = this.store.select(selectAuthUser);

    this.store.dispatch(getThemesList());
    this.userId = this.route.snapshot.params['id'];
    this.store.dispatch(setUserId({ id: this.userId }));

    this.userLoading$ = this.store.select(selectAuthUserLoading);
    this.websiteLoading$ = this.store.select(selectWebsiteLoading);
    this.themes$ = this.store.select(selectThemeList);

    this.store.dispatch(getUserPortfolioData({ id: this.userId }));

    this.themes$.pipe(take(2)).subscribe((themes) => {
      this.themes = themes;
    });

    this.websiteUser$.pipe(take(2)).subscribe((user) => {
      if (user && this.themes.length) {
        this.activeTheme = this.themes.find(
          (theme) => theme._id === user.theme,
        );
      }
    });
  }

  scrollToSection(sectionId: string): void {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  navigateToSettings() {
    this.router.navigate(['/settings']);
  }
}
