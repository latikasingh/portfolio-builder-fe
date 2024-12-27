import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IWebsiteUserState } from './user.reducer';

export const selectWebsiteUserState =
  createFeatureSelector<IWebsiteUserState>('websiteUser');

export const selectWebsiteLoading = createSelector(
  selectWebsiteUserState,
  (state: IWebsiteUserState) => state.loading,
);

export const selectWebsiteUser = createSelector(
  selectWebsiteUserState,
  (state: IWebsiteUserState) => state.user,
);

export const selectWebsiteError = createSelector(
  selectWebsiteUserState,
  (state: IWebsiteUserState) => state.error,
);

export const selectWebsiteAboutData = createSelector(
  selectWebsiteUserState,
  (state: IWebsiteUserState) => state.about,
);
