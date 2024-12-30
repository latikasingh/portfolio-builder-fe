import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IPortfolioState } from './portfolio.reducer';

export const selectPortfolioState =
  createFeatureSelector<IPortfolioState>('portfolio');

export const selectSkillsLoading = createSelector(
  selectPortfolioState,
  (state: IPortfolioState) => state.loading,
);

export const selectSkillsData = createSelector(
  selectPortfolioState,
  (state: IPortfolioState) => state.portfolio,
);

export const selectSkillsError = createSelector(
  selectPortfolioState,
  (state: IPortfolioState) => state.error,
);
