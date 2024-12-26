import { createAction, props } from '@ngrx/store';
import { IUser } from '../../../modals/user.modal';
import { IError } from '../../../modals/error.modal';

// Get website user data
export const getWebsiteUserData = createAction(
  '[Auth] GetWebsiteUserData',
  props<{ id: string }>(),
);

export const getWebsiteUserDataSuccess = createAction(
  '[Auth] GetWebsiteUserDataSuccess',
  props<{ user: IUser }>(),
);

export const getWebsiteUserDataError = createAction(
  '[Auth] GetWebsiteUserDataError',
  props<{ error: IError }>(),
);
