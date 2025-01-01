import { createAction, props } from '@ngrx/store';
import { IError } from '../../modals/error.modal';

// get active theme
export const getActiveTheme = createAction('[User] GetActiveTheme');

export const getActiveThemeSuccess = createAction(
  '[User] GetActiveThemeSuccess',
  props<{ theme: string }>(),
);

export const getActiveThemeError = createAction(
  '[User] GetActiveThemeError',
  props<{ error: IError }>(),
);
