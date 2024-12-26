import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IWebsiteUserState } from './user.reducer';

export const selectAuthState =
  createFeatureSelector<IWebsiteUserState>('websiteUser');

export const selectUserLoading = createSelector(
  selectAuthState,
  (state: IWebsiteUserState) => state.loading,
);

export const selectUser = createSelector(
  selectAuthState,
  (state: IWebsiteUserState) => state.user,
);

export const selectUserError = createSelector(
  selectAuthState,
  (state: IWebsiteUserState) => state.error,
);
