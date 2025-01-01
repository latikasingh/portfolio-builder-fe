import { createReducer, on } from '@ngrx/store';
import { IError } from '../../modals/error.modal';
import {
  getActiveTheme,
  getActiveThemeError,
  getActiveThemeSuccess,
} from './theme.action';

export interface IThemeState {
  loading: boolean;
  theme: string;
  error: IError;
}

export const initialState: IThemeState = {
  loading: false,
  theme: null,
  error: null,
};

export const themeReducer = createReducer(
  initialState,

  // get skills data
  on(getActiveTheme, (state) => ({ ...state, loading: true })),
  on(getActiveThemeSuccess, (state, { theme }) => ({
    ...state,
    loading: false,
    theme,
  })),
  on(getActiveThemeError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);
