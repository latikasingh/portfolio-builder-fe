import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { AlertService } from '../../services/alert.service';
import { ResumeService } from '../../services/resume.service';
import {
  deleteResumeData,
  deleteResumeDataError,
  deleteResumeDataSuccess,
  getResumeData,
  getResumeDataError,
  getResumeDataSuccess,
  postResumeData,
  postResumeDataError,
  postResumeDataSuccess,
  updateResumeData,
  updateResumeDataError,
  updateResumeDataSuccess,
} from './resume.action';

@Injectable()
export class ResumeEffects {
  private actions$ = inject(Actions);
  private alertService = inject(AlertService);
  private resumeService = inject(ResumeService);

  getSkillData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getResumeData),
      exhaustMap(() =>
        this.resumeService.getResumeData().pipe(
          map((response) => {
            return getResumeDataSuccess({ data: response });
          }),
          catchError((error) => {
            this.alertService.displayErrorToasts(error.error.message);

            return of(
              getResumeDataError({
                error: { message: error.message, statusCode: error.status },
              }),
            );
          }),
        ),
      ),
    ),
  );

  postResumeData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(postResumeData),
      exhaustMap((props) =>
        this.resumeService.postResume(props.payload).pipe(
          map((response) => {
            this.alertService.displaySuccessToasts('Data added successfully');
            return postResumeDataSuccess({ data: response });
          }),
          catchError((error) => {
            this.alertService.displayErrorToasts(error.error.message);

            return of(
              postResumeDataError({
                error: { message: error.message, statusCode: error.status },
              }),
            );
          }),
        ),
      ),
    ),
  );

  updateResumeData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateResumeData),
      exhaustMap((props) =>
        this.resumeService.updateResume(props.payload, props.id).pipe(
          map((response) => {
            this.alertService.displaySuccessToasts('Data updated successfully');
            return updateResumeDataSuccess({ data: response });
          }),
          catchError((error) => {
            this.alertService.displayErrorToasts(error.error.message);

            return of(
              updateResumeDataError({
                error: { message: error.message, statusCode: error.status },
              }),
            );
          }),
        ),
      ),
    ),
  );

  deleteResumeData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteResumeData),
      exhaustMap((props) =>
        this.resumeService.deleteResume(props.id).pipe(
          map(() => {
            this.alertService.displaySuccessToasts('Data deleted successfully');
            return deleteResumeDataSuccess({ id: props.id });
          }),
          catchError((error) => {
            this.alertService.displayErrorToasts(error.error.message);

            return of(
              deleteResumeDataError({
                error: { message: error.message, statusCode: error.status },
              }),
            );
          }),
        ),
      ),
    ),
  );
}
