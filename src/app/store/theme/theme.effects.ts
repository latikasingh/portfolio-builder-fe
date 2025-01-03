import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { AlertService } from '../../services/alert.service';
import { SkillsService } from '../../services/skills.service';
import {
  getActiveTheme,
  getActiveThemeError,
  getActiveThemeSuccess,
  getThemesList,
  getThemesListError,
  getThemesListSuccess,
  updateTheme,
  updateThemeError,
  updateThemeSuccess,
} from './theme.action';
import { ThemeService } from '../../services/theme.service';
import { Store } from '@ngrx/store';
import { setTheme } from '../auth/auth.action';

@Injectable()
export class ThemeEffects {
  private actions$ = inject(Actions);
  private alertService = inject(AlertService);
  private themeService = inject(ThemeService);
  private store = inject(Store);

  getActiveTheme$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getActiveTheme),
      exhaustMap(() =>
        this.themeService.getCurrentTheme().pipe(
          map((response) => {
            return getActiveThemeSuccess({ theme: response });
          }),
          catchError((error) => {
            this.alertService.displayErrorToasts(error.error.message);

            return of(
              getActiveThemeError({
                error: { message: error.message, statusCode: error.status },
              }),
            );
          }),
        ),
      ),
    ),
  );

  getThemesList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getThemesList),
      exhaustMap(() =>
        this.themeService.getThemeList().pipe(
          map((response) => {
            return getThemesListSuccess({ themes: response });
          }),
          catchError((error) => {
            this.alertService.displayErrorToasts(error.error.message);

            return of(
              getThemesListError({
                error: { message: error.message, statusCode: error.status },
              }),
            );
          }),
        ),
      ),
    ),
  );

  updateTheme$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateTheme),
      exhaustMap((props) =>
        this.themeService.updateTheme(props.id).pipe(
          map((response) => {
            console.log(response.user.theme);

            this.store.dispatch(setTheme({ theme: response.user.theme }));
            return updateThemeSuccess({ user: response.user });
          }),
          catchError((error) => {
            this.alertService.displayErrorToasts(error.error.message);

            return of(
              updateThemeError({
                error: { message: error.message, statusCode: error.status },
              }),
            );
          }),
        ),
      ),
    ),
  );
}
