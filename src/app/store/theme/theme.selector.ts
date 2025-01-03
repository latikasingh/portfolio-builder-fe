import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IThemeState } from './theme.reducer';

export const selectThemeState = createFeatureSelector<IThemeState>('theme');

export const selectThemeLoading = createSelector(
  selectThemeState,
  (state: IThemeState) => state.loading,
);

export const selectTheme = createSelector(
  selectThemeState,
  (state: IThemeState) => state.activeTheme,
);

export const selectThemeList = createSelector(
  selectThemeState,
  (state: IThemeState) => state.themes,
);

export const selectThemeError = createSelector(
  selectThemeState,
  (state: IThemeState) => state.error,
);
