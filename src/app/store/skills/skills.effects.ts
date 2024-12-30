import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { AlertService } from '../../services/alert.service';
import { SkillsService } from '../../services/skills.service';
import {
  getSkillData,
  getSkillDataError,
  getSkillDataSuccess,
  postSkillData,
  postSkillDataError,
  postSkillDataSuccess,
  updateSkillData,
  updateSkillDataError,
  updateSkillDataSuccess,
} from './skills.action';

@Injectable()
export class SkillsEffects {
  private actions$ = inject(Actions);
  private alertService = inject(AlertService);
  private skillsService = inject(SkillsService);

  postSkillData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(postSkillData),
      exhaustMap((props) =>
        this.skillsService.addSkills(props.payload).pipe(
          map((response) => {
            return postSkillDataSuccess({ data: response });
          }),
          catchError((error) => {
            this.alertService.displayErrorToasts(error.error.message);

            return of(
              postSkillDataError({
                error: { message: error.message, statusCode: error.status },
              }),
            );
          }),
        ),
      ),
    ),
  );

  getSkillData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getSkillData),
      exhaustMap(() =>
        this.skillsService.getSkills().pipe(
          map((response) => {
            return getSkillDataSuccess({ data: response });
          }),
          catchError((error) => {
            this.alertService.displayErrorToasts(error.error.message);

            return of(
              getSkillDataError({
                error: { message: error.message, statusCode: error.status },
              }),
            );
          }),
        ),
      ),
    ),
  );

  updateSkillData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateSkillData),
      exhaustMap((props) =>
        this.skillsService.updateSkills(props.payload, props.id).pipe(
          map((response) => {
            return updateSkillDataSuccess({ data: response });
          }),
          catchError((error) => {
            this.alertService.displayErrorToasts(error.error.message);

            return of(
              updateSkillDataError({
                error: { message: error.message, statusCode: error.status },
              }),
            );
          }),
        ),
      ),
    ),
  );
}
