import { createAction, props } from '@ngrx/store';
import { IError } from '../../modals/error.modal';
import { Icons, IService, IServiceDto } from '../../modals/service.modal';

// Get icons
export const getIcons = createAction(
  '[User] getIcons',
  props<{ iconName: string }>(),
);

export const getIconsSuccess = createAction(
  '[User] GetIconsSuccess',
  props<{ icons: Icons[] }>(),
);

export const getIconsError = createAction(
  '[User] GetIconsError',
  props<{ error: IError }>(),
);

// Get service data
export const getServiceData = createAction('[User] getServiceData');

export const getServiceDataSuccess = createAction(
  '[User] GetServiceDataSuccess',
  props<{ services: IServiceDto }>(),
);

export const getServiceDataError = createAction(
  '[User] GetServiceDataError',
  props<{ error: IError }>(),
);

// Add service data
export const addService = createAction(
  '[User] AddService',
  props<{ payload: IService }>(),
);

export const addServiceSuccess = createAction(
  '[User] AddServiceSuccess',
  props<{ service: IServiceDto }>(),
);

export const addServiceError = createAction(
  '[User] AddServiceError',
  props<{ error: IError }>(),
);

// Update service data
export const updateService = createAction(
  '[User] UpdateService',
  props<{ payload: IService; id: string }>(),
);

export const updateServiceSuccess = createAction(
  '[User] UpdateServiceSuccess',
  props<{ service: IServiceDto }>(),
);

export const updateServiceError = createAction(
  '[User] UpdateServiceError',
  props<{ error: IError }>(),
);
