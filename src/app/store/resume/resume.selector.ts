import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IResumeState } from './resume.reducer';

export const selectResumeState = createFeatureSelector<IResumeState>('resume');

export const selectResumeLoading = createSelector(
  selectResumeState,
  (state: IResumeState) => state.loading,
);

export const selectResumeData = createSelector(
  selectResumeState,
  (state: IResumeState) => state.resume,
);

export const selectResumeError = createSelector(
  selectResumeState,
  (state: IResumeState) => state.error,
);

export const selectIsSuccess = createSelector(
  selectResumeState,
  (state: IResumeState) => state.success,
);

export const selectDeleteLoading = createSelector(
  selectResumeState,
  (state: IResumeState) => state.deleteLoading,
);
