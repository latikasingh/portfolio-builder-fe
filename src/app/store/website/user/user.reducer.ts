import { createReducer, on } from '@ngrx/store';
import { IUser } from '../../../modals/user.modal';
import { IError } from '../../../modals/error.modal';
import {
  getWebsiteUserData,
  getWebsiteUserDataError,
  getWebsiteUserDataSuccess,
} from './user.action';

export interface IWebsiteUserState {
  loading: boolean;
  user: IUser;
  error: IError;
}

export const initialState: IWebsiteUserState = {
  loading: false,
  user: null,
  error: null,
};

export const websiteUserReducer = createReducer(
  initialState,

  // Get website user data
  on(getWebsiteUserData, (state) => ({ ...state, loading: true })),
  on(getWebsiteUserDataSuccess, (state, { user }) => ({
    ...state,
    loading: false,
    user,
  })),
  on(getWebsiteUserDataError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);
