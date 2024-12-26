import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IAuthState } from './auth.reducer';

export const selectAuthState = createFeatureSelector<IAuthState>('auth');

export const selectAuthLoading = createSelector(
  selectAuthState,
  (state: IAuthState) => state.loading,
);

export const selectAuthUserLoading = createSelector(
  selectAuthState,
  (state: IAuthState) => state.getUserLoading,
);

export const selectAuthUser = createSelector(
  selectAuthState,
  (state: IAuthState) => state.user,
);

export const selectAuthError = createSelector(
  selectAuthState,
  (state: IAuthState) => state.error,
);
