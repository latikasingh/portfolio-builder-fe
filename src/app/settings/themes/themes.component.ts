import { Component, OnDestroy, OnInit } from '@angular/core';
import { IThemes } from '../../modals/themes.modal';
import { Store } from '@ngrx/store';
import {
  getActiveTheme,
  getThemesList,
  updateTheme,
} from '../../store/theme/theme.action';
import { combineLatest, Observable, Subject, take, takeUntil } from 'rxjs';
import { selectThemeList } from '../../store/theme/theme.selector';
import { IUser } from '../../modals/user.modal';
import { selectAuthUser } from '../../store/auth/auth.selector';

@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrl: './themes.component.scss',
})
export class ThemesComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  themes$: Observable<IThemes[]>;
  authUser$: Observable<IUser>;

  themes: IThemes[] = [];
  activeTheme: string = 'Default Theme';
  previousTheme: string = 'Default Theme';
  disableBtn: boolean = true;
  selectedThemeId: string;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(getThemesList());
    this.themes$ = this.store.select(selectThemeList);
    this.authUser$ = this.store.select(selectAuthUser);
    combineLatest([this.themes$, this.authUser$])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([themes, user]) => {
        this.themes = themes;

        if (user && (themes ?? []).length) {
          this.activeTheme = themes.find(
            (theme) => theme._id === user.theme,
          )?.name;
          this.previousTheme = this.activeTheme;
        }
      });
  }

  selectTheme(theme: string, id: string) {
    this.selectedThemeId = id;
    this.activeTheme = theme;
    this.previousTheme === this.activeTheme
      ? (this.disableBtn = true)
      : (this.disableBtn = false);
  }

  onSave() {
    this.previousTheme = this.activeTheme;
    this.disableBtn = true;
    this.store.dispatch(updateTheme({ id: this.selectedThemeId }));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
