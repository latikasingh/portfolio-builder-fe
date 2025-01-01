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
} from './theme.action';
import { ThemeService } from '../../services/theme.service';

@Injectable()
export class ThemeEffects {
  private actions$ = inject(Actions);
  private alertService = inject(AlertService);
  private themeService = inject(ThemeService);

  getActiveTheme$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getActiveTheme),
      exhaustMap(() =>
        this.themeService.getCurrentTheme().pipe(
          map((response) => {
            return getActiveThemeSuccess({ theme: response.theme });
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
}
