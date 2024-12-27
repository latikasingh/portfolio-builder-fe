import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IAboutUserState } from './about.reducer';

export const selectUserAboutState =
  createFeatureSelector<IAboutUserState>('about');

export const selectUserAboutLoading = createSelector(
  selectUserAboutState,
  (state: IAboutUserState) => state.loading,
);

export const selectUserAboutData = createSelector(
  selectUserAboutState,
  (state: IAboutUserState) => state.data,
);

export const selectUserAboutError = createSelector(
  selectUserAboutState,
  (state: IAboutUserState) => state.error,
);
