import { Action, createReducer, on } from '@ngrx/store';
import { IUser } from '../../modals/user.modal';
import { IError } from '../../modals/error.modal';
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
} from './auth.action';

export interface IAuthState {
  loading: boolean;
  getUserLoading: boolean;
  user: IUser;
  error: IError;
}

export const initialState: IAuthState = {
  loading: false,
  getUserLoading: false,
  user: null,
  error: null,
};

export const authReducer = createReducer(
  initialState,

  // Login
  on(login, (state) => ({ ...state, loading: true })),
  on(loginSuccess, (state, { user }) => ({ ...state, loading: false, user })),
  on(loginError, (state, { error }) => ({ ...state, loading: false, error })),

  // Signup
  on(signup, (state) => ({ ...state, loading: true })),
  on(signupSuccess, (state, { user }) => ({ ...state, loading: false, user })),
  on(signupError, (state, { error }) => ({ ...state, loading: false, error })),

  // Get user
  on(getUser, (state) => ({ ...state, getUserLoading: true })),
  on(getUserSuccess, (state, { user }) => ({
    ...state,
    getUserLoading: false,
    user,
  })),
  on(getUserError, (state, { error }) => ({
    ...state,
    getUserLoading: false,
    error,
  })),

  // Logout
  on(logout, (state) => ({ ...state, getUserLoading: true })),
  on(logoutSuccess, (state) => ({
    ...state,
    getUserLoading: false,
    user: null,
  })),
  on(logoutError, (state, { error }) => ({
    ...state,
    getUserLoading: false,
    error,
  })),
);
