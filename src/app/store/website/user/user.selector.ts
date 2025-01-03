import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IWebsiteState } from './user.reducer';

export const selectWebsiteState =
  createFeatureSelector<IWebsiteState>('website');

export const selectWebsiteLoading = createSelector(
  selectWebsiteState,
  (state: IWebsiteState) => state.loading,
);

export const selectWebsiteUser = createSelector(
  selectWebsiteState,
  (state: IWebsiteState) => state.user,
);

export const selectWebsiteError = createSelector(
  selectWebsiteState,
  (state: IWebsiteState) => state.error,
);

export const selectWebsiteAboutData = createSelector(
  selectWebsiteState,
  (state: IWebsiteState) => state.about,
);
export const selectWebsiteSkillData = createSelector(
  selectWebsiteState,
  (state: IWebsiteState) => state.skill,
);

export const selectWebsiteResumeData = createSelector(
  selectWebsiteState,
  (state: IWebsiteState) => state.resume,
);
export const selectWebsitePortfolioData = createSelector(
  selectWebsiteState,
  (state: IWebsiteState) => state.portfolio,
);

export const selectWebsiteServiceData = createSelector(
  selectWebsiteState,
  (state: IWebsiteState) => state.service,
);

export const selectWebsiteTheme = createSelector(
  selectWebsiteState,
  (state: IWebsiteState) => state.theme,
);
