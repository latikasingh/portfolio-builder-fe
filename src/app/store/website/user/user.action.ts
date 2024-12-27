import { createAction, props } from '@ngrx/store';
import { IUser } from '../../../modals/user.modal';
import { IError } from '../../../modals/error.modal';

//Set Userid
export const setUserId = createAction(
  '[Website] SetUserId',
  props<{ id: string }>(),
);

// Get website user data
export const getWebsiteUserData = createAction(
  '[Website] GetWebsiteUserData',
  props<{ id: string }>(),
);

export const getWebsiteUserDataSuccess = createAction(
  '[Website] GetWebsiteUserDataSuccess',
  props<{ user: IUser }>(),
);

export const getWebsiteUserDataError = createAction(
  '[Website] GetWebsiteUserDataError',
  props<{ error: IError }>(),
);
