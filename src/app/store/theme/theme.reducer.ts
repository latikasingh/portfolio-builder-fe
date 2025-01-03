import { createReducer, on } from '@ngrx/store';
import { IError } from '../../modals/error.modal';
import {
  getActiveTheme,
  getActiveThemeError,
  getActiveThemeSuccess,
  getThemesList,
  getThemesListError,
  getThemesListSuccess,
} from './theme.action';
import { IThemes } from '../../modals/themes.modal';

export interface IThemeState {
  loading: boolean;
  activeTheme: IThemes;
  themes: IThemes[];
  error: IError;
}

export const initialState: IThemeState = {
  loading: false,
  themes: [],
  activeTheme: null,
  error: null,
};

export const themeReducer = createReducer(
  initialState,

  // get active theme
  on(getActiveTheme, (state) => ({ ...state, loading: true })),
  on(getActiveThemeSuccess, (state, { theme }) => ({
    ...state,
    loading: false,
    activeTheme: theme,
  })),
  on(getActiveThemeError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // get all themes
  on(getThemesList, (state) => ({ ...state, loading: true })),
  on(getThemesListSuccess, (state, { themes }) => ({
    ...state,
    loading: false,
    themes,
  })),
  on(getThemesListError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);
