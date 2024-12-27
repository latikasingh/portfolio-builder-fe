import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { AuthService, IAuthRes } from '../../services/auth.service';
import {
  getUser,
  getUserError,
  getUserSuccess,
  login,
  loginError,
  loginSuccess,
  logout,
  logoutError,
  logoutSuccess,
  signup,
  signupError,
  signupSuccess,
  updateUser,
  updateUserError,
  updateUserSuccess,
} from './auth.action';
import { AlertService } from '../../services/alert.service';
import { Router } from '@angular/router';
import { IUser } from '../../modals/user.modal';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private alertService = inject(AlertService);
  private router = inject(Router);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      exhaustMap(({ email, password }) =>
        this.authService.login(email, password).pipe(
          map((response: IAuthRes) => {
            if (response.token) {
              localStorage.setItem('authToken', response.token);
              this.router.navigate(['settings']);
            }
            return loginSuccess({ ...response });
          }),
          catchError((error) => {
            this.alertService.displayErrorToasts(error.error.message);

            return of(
              loginError({
                error: { message: error.message, statusCode: error.status },
              }),
            );
          }),
        ),
      ),
    ),
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logout),
      exhaustMap(() =>
        this.authService.logout().pipe(
          map(() => {
            localStorage.clear();
            this.router.navigate(['auth']);
            this.alertService.displaySuccessToasts('Logout success');
            return logoutSuccess();
          }),
          catchError((error) => {
            this.alertService.displayErrorToasts(error.error.message);

            return of(
              logoutError({
                error: { message: error.message, statusCode: error.status },
              }),
            );
          }),
        ),
      ),
    ),
  );

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUser),
      exhaustMap(() =>
        this.authService.getLoggedInUser().pipe(
          map((response: { user: IUser }) => {
            return getUserSuccess({ user: response.user });
          }),
          catchError((error) => {
            this.alertService.displayErrorToasts(error.error.message);

            return of(
              getUserError({
                error: { message: error.message, statusCode: error.status },
              }),
            );
          }),
        ),
      ),
    ),
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUser),
      exhaustMap((props) =>
        this.authService.updateUser(props.user, props.id).pipe(
          map((response) => {
            this.alertService.displaySuccessToasts(
              'Profile data updated successfully',
            );
            return updateUserSuccess({ user: response.user });
          }),
          catchError((error) => {
            this.alertService.displayErrorToasts(error.error.message);

            return of(
              updateUserError({
                error: { message: error.message, statusCode: error.status },
              }),
            );
          }),
        ),
      ),
    ),
  );

  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signup),
      exhaustMap((props) =>
        this.authService.signup(props.payload).pipe(
          map((response: IAuthRes) => {
            if (response.token) {
              localStorage.setItem('authToken', response.token);
              this.router.navigate(['settings']);
            }
            return signupSuccess({ ...response });
          }),
          catchError((error) => {
            this.alertService.displayErrorToasts(error.error.message);
            return of(
              signupError({
                error: { message: error.message, statusCode: error.status },
              }),
            );
          }),
        ),
      ),
    ),
  );
}
