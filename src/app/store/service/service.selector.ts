import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IServiceState } from './service.reducer';

export const selectServiceState =
  createFeatureSelector<IServiceState>('service');

export const selectServicesLoading = createSelector(
  selectServiceState,
  (state: IServiceState) => state.loading,
);

export const selectServicesData = createSelector(
  selectServiceState,
  (state: IServiceState) => state.data,
);

export const selectServicesIcons = createSelector(
  selectServiceState,
  (state: IServiceState) => state.icons,
);

export const selectServicesIconsLoading = createSelector(
  selectServiceState,
  (state: IServiceState) => state.iconsLoading,
);

export const selectServicesError = createSelector(
  selectServiceState,
  (state: IServiceState) => state.error,
);
