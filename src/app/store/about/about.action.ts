import { createAction, props } from '@ngrx/store';
import { IAboutDto, IAbout } from '../../modals/about.modal';
import { IError } from '../../modals/error.modal';

// Get user about data
export const getAboutData = createAction('[User] GetAboutData');

export const getAboutDataSuccess = createAction(
  '[User] GetAboutDataSuccess',
  props<{ data: IAboutDto }>(),
);

export const getAboutDataError = createAction(
  '[User] GetAboutDataError',
  props<{ error: IError }>(),
);

// post about dada
export const postAboutData = createAction(
  '[User] PostAboutData',
  props<{ data: IAbout }>(),
);

export const postAboutDataSuccess = createAction(
  '[User] PostAboutDataSuccess',
  props<{ data: IAboutDto }>(),
);

export const postAboutDataError = createAction(
  '[User] PostAboutDataError',
  props<{ error: IError }>(),
);

// update about dada
export const updateAboutData = createAction(
  '[User] UpdateAboutData',
  props<{ data: IAbout; id: string }>(),
);

export const updateAboutDataSuccess = createAction(
  '[User] UpdateAboutDataSuccess',
  props<{ data: IAboutDto }>(),
);

export const updateAboutDataError = createAction(
  '[User] UpdateAboutDataError',
  props<{ error: IError }>(),
);
