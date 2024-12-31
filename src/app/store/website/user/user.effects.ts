import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { AlertService } from '../../../services/alert.service';
import {
  getUserDataPortfolioError,
  getUserPortfolioData,
  getUserPortfolioDataSuccess,
  getWebsiteAboutData,
  getWebsiteAboutDataError,
  getWebsiteAboutDataSuccess,
  getWebsiteUserData,
  getWebsiteUserDataError,
  getWebsiteUserDataSuccess,
} from './user.action';
import { WebsiteService } from '../../../services/website.service';

@Injectable()
export class WebsiteUserEffects {
  private actions$ = inject(Actions);
  private alertService = inject(AlertService);
  private websiteService = inject(WebsiteService);

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getWebsiteUserData),
      exhaustMap((props) =>
        this.websiteService.getUserById(props.id).pipe(
          map((response) => {
            return getWebsiteUserDataSuccess({ user: response.user });
          }),
          catchError((error) => {
            this.alertService.displayErrorToasts(error.error.message);

            return of(
              getWebsiteUserDataError({
                error: { message: error.message, statusCode: error.status },
              }),
            );
          }),
        ),
      ),
    ),
  );

  getWebsiteAboutData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getWebsiteAboutData),
      exhaustMap((props) =>
        this.websiteService.getUserAboutData(props.id).pipe(
          map((response) => {
            return getWebsiteAboutDataSuccess({ about: response });
          }),
          catchError((error) => {
            this.alertService.displayErrorToasts(error.error.message);

            return of(
              getWebsiteAboutDataError({
                error: { message: error.message, statusCode: error.status },
              }),
            );
          }),
        ),
      ),
    ),
  );

  getUserPortfolioData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUserPortfolioData),
      exhaustMap((props) =>
        this.websiteService.getUserPortfolioData(props.id).pipe(
          map((response) => {
            return getUserPortfolioDataSuccess({ data: response.data });
          }),
          catchError((error) => {
            this.alertService.displayErrorToasts(error.error.message);

            return of(
              getUserDataPortfolioError({
                error: { message: error.message, statusCode: error.status },
              }),
            );
          }),
        ),
      ),
    ),
  );
}
