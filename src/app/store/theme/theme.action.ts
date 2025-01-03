import { createAction, props } from '@ngrx/store';
import { IError } from '../../modals/error.modal';
import { IThemes } from '../../modals/themes.modal';
import { IUser } from '../../modals/user.modal';

// get active theme
export const getActiveTheme = createAction('[User] GetActiveTheme');

export const getActiveThemeSuccess = createAction(
  '[User] GetActiveThemeSuccess',
  props<{ theme: IThemes }>(),
);

export const getActiveThemeError = createAction(
  '[User] GetActiveThemeError',
  props<{ error: IError }>(),
);

// get themes list
export const getThemesList = createAction('[User] GetThemesList');

export const getThemesListSuccess = createAction(
  '[User] GetThemesListSuccess',
  props<{ themes: IThemes[] }>(),
);

export const getThemesListError = createAction(
  '[User] GetThemesListError',
  props<{ error: IError }>(),
);

// update theme
export const updateTheme = createAction(
  '[User] UpdateTheme',
  props<{ id: string }>(),
);

export const updateThemeSuccess = createAction(
  '[User] UpdateThemeSuccess',
  props<{ user: IUser }>(),
);

export const updateThemeError = createAction(
  '[User] UpdateThemeError',
  props<{ error: IError }>(),
);
