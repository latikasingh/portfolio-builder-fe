import { createReducer, on } from '@ngrx/store';
import { IUser } from '../../../modals/user.modal';
import { IError } from '../../../modals/error.modal';
import {
  getWebsiteUserData,
  getWebsiteUserDataError,
  getWebsiteUserDataSuccess,
  setUserId,
} from './user.action';

export interface IWebsiteUserState {
  loading: boolean;
  user: IUser;
  error: IError;
  userId: string;
}

export const initialState: IWebsiteUserState = {
  loading: false,
  user: null,
  error: null,
  userId: null,
};

export const websiteUserReducer = createReducer(
  initialState,

  // Set user id
  on(setUserId, (state, { id }) => ({ ...state, userId: id })),

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
