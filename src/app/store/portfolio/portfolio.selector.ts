import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IPortfolioState } from './portfolio.reducer';

export const selectPortfolioState =
  createFeatureSelector<IPortfolioState>('portfolio');

export const selectPortfolioLoading = createSelector(
  selectPortfolioState,
  (state: IPortfolioState) => state.loading,
);

export const selectPortfolioGetLoading = createSelector(
  selectPortfolioState,
  (state: IPortfolioState) => state.getLoading,
);

export const selectPortfolioData = createSelector(
  selectPortfolioState,
  (state: IPortfolioState) => state.portfolio,
);

export const selectPortfolioError = createSelector(
  selectPortfolioState,
  (state: IPortfolioState) => state.error,
);
