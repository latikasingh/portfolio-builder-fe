import { createAction, props } from '@ngrx/store';
import { IUser } from '../../modals/user.modal';
import { IError } from '../../modals/error.modal';
import { ISignupDto } from '../../modals/auth.modal';

// Login
export const login = createAction(
  '[Auth] Login',
  props<{ email: string; password: string }>(),
);

export const loginSuccess = createAction(
  '[Auth] LoginSuccess',
  props<{ user: IUser; token: string }>(),
);

export const loginError = createAction(
  '[Auth] LoginError',
  props<{ error: IError }>(),
);

// Signup
export const signup = createAction(
  '[Auth] Signup',
  props<{ payload: ISignupDto }>(),
);

export const signupSuccess = createAction(
  '[Auth] SignupSuccess',
  props<{ user: IUser; token: string }>(),
);

export const signupError = createAction(
  '[Auth] SignupError',
  props<{ error: IError }>(),
);

// Logout
export const logout = createAction('[Auth] Logout');

export const logoutSuccess = createAction('[Auth] LogoutSuccess');

export const logoutError = createAction(
  '[Auth] LogoutError',
  props<{ error: IError }>(),
);

// Get User
export const getUser = createAction('[Auth] GetUser');

export const getUserSuccess = createAction(
  '[Auth] GetUserSuccess',
  props<{ user: IUser }>(),
);

export const getUserError = createAction(
  '[Auth] GetUserErrorError',
  props<{ error: IError }>(),
);