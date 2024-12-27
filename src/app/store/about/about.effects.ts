import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { AlertService } from '../../services/alert.service';
import {
  getAboutData,
  getAboutDataError,
  getAboutDataSuccess,
  postAboutData,
  postAboutDataError,
  postAboutDataSuccess,
  updateAboutData,
  updateAboutDataError,
  updateAboutDataSuccess,
} from './about.action';
import { AboutService } from '../../services/about.service';

@Injectable()
export class AboutUserEffects {
  private actions$ = inject(Actions);
  private alertService = inject(AlertService);
  private aboutService = inject(AboutService);

  getAboutData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAboutData),
      exhaustMap(() =>
        this.aboutService.getAboutData().pipe(
          map((response) => {
            return getAboutDataSuccess({ data: response });
          }),
          catchError((error) => {
            this.alertService.displayErrorToasts(error.error.message);

            return of(
              getAboutDataError({
                error: { message: error.message, statusCode: error.status },
              }),
            );
          }),
        ),
      ),
    ),
  );

  postAboutData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(postAboutData),
      exhaustMap((props) =>
        this.aboutService.postAboutData(props.data).pipe(
          map((response) => {
            return postAboutDataSuccess({ data: response });
          }),
          catchError((error) => {
            this.alertService.displayErrorToasts(error.error.message);

            return of(
              postAboutDataError({
                error: { message: error.message, statusCode: error.status },
              }),
            );
          }),
        ),
      ),
    ),
  );

  updateAboutData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateAboutData),
      exhaustMap((props) =>
        this.aboutService.updateAboutData(props.data, props.id).pipe(
          map((response) => {
            return updateAboutDataSuccess({ data: response });
          }),
          catchError((error) => {
            this.alertService.displayErrorToasts(error.error.message);

            return of(
              updateAboutDataError({
                error: { message: error.message, statusCode: error.status },
              }),
            );
          }),
        ),
      ),
    ),
  );
}
