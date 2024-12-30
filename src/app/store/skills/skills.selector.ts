import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ISkillsState } from './skills.reducer';

export const selectSkillsState = createFeatureSelector<ISkillsState>('skills');

export const selectSkillsLoading = createSelector(
  selectSkillsState,
  (state: ISkillsState) => state.loading,
);

export const selectSkillsData = createSelector(
  selectSkillsState,
  (state: ISkillsState) => state.skills,
);

export const selectSkillsError = createSelector(
  selectSkillsState,
  (state: ISkillsState) => state.error,
);
