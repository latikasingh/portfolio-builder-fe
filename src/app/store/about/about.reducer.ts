import { createReducer, on } from '@ngrx/store';
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
import { IAboutDto } from '../../modals/about.modal';
import { IError } from '../../modals/error.modal';

export interface IAboutUserState {
  loading: boolean;
  data: IAboutDto;
  error: IError;
}

export const initialState: IAboutUserState = {
  loading: false,
  data: null,
  error: null,
};

export const aboutUserReducer = createReducer(
  initialState,

  // Get about user data
  on(getAboutData, (state) => ({ ...state, loading: true })),
  on(getAboutDataSuccess, (state, { data }) => ({
    ...state,
    loading: false,
    data,
  })),
  on(getAboutDataError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // post about user data
  on(postAboutData, (state) => ({ ...state, loading: true })),
  on(postAboutDataSuccess, (state, { data }) => ({
    ...state,
    loading: false,
    data,
  })),
  on(postAboutDataError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // update about user data
  on(updateAboutData, (state) => ({ ...state, loading: true })),
  on(updateAboutDataSuccess, (state, { data }) => ({
    ...state,
    loading: false,
    data,
  })),
  on(updateAboutDataError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);
