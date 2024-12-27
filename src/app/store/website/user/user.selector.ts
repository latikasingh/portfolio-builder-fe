import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IWebsiteUserState } from './user.reducer';

export const selectWebsiteUserState =
  createFeatureSelector<IWebsiteUserState>('websiteUser');

export const selectWebsiteUserLoading = createSelector(
  selectWebsiteUserState,
  (state: IWebsiteUserState) => state.loading,
);

export const selectWebsiteUser = createSelector(
  selectWebsiteUserState,
  (state: IWebsiteUserState) => state.user,
);

export const selectWebsiteUserError = createSelector(
  selectWebsiteUserState,
  (state: IWebsiteUserState) => state.error,
);
