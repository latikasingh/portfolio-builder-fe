import { createReducer, on } from '@ngrx/store';
import { IError } from '../../modals/error.modal';
import { ISkillDto } from '../../modals/skills.modal';
import { Icons, IServiceDto } from '../../modals/service.modal';
import {
  addService,
  addServiceError,
  addServiceSuccess,
  getIcons,
  getIconsError,
  getIconsSuccess,
  getServiceData,
  getServiceDataError,
  getServiceDataSuccess,
  updateService,
  updateServiceError,
  updateServiceSuccess,
} from './service.action';

export interface IServiceState {
  loading: boolean;
  iconsLoading: boolean;
  data: IServiceDto;
  icons: Icons[];
  error: IError;
}

export const initialState: IServiceState = {
  loading: false,
  iconsLoading: false,
  data: null,
  icons: [],
  error: null,
};

export const serviceReducer = createReducer(
  initialState,

  // get services data
  on(getServiceData, (state) => ({ ...state, loading: true })),
  on(getServiceDataSuccess, (state, { services }) => ({
    ...state,
    loading: false,
    data: services,
  })),
  on(getServiceDataError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // get icons data
  on(getIcons, (state) => ({ ...state, iconsLoading: true })),
  on(getIconsSuccess, (state, { icons }) => ({
    ...state,
    iconsLoading: false,
    icons,
  })),
  on(getIconsError, (state, { error }) => ({
    ...state,
    iconsLoading: false,
    error,
  })),

  // add services data
  on(addService, (state) => ({ ...state, loading: true })),
  on(addServiceSuccess, (state, { service }) => ({
    ...state,
    loading: false,
    data: service,
  })),
  on(addServiceError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // update services data
  on(updateService, (state) => ({ ...state, loading: true })),
  on(updateServiceSuccess, (state, { service }) => ({
    ...state,
    loading: false,
    data: service,
  })),
  on(updateServiceError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);
