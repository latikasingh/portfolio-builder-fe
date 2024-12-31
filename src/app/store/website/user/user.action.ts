import { createAction, props } from '@ngrx/store';
import { IUser } from '../../../modals/user.modal';
import { IError } from '../../../modals/error.modal';
import { IAboutDto } from '../../../modals/about.modal';
import { IWebsiteUserState } from './user.reducer';

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

// Get website about data
export const getWebsiteAboutData = createAction(
  '[Website] GetWebsiteAboutData',
  props<{ id: string }>(),
);

export const getWebsiteAboutDataSuccess = createAction(
  '[Website] GetWebsiteAboutDataSuccess',
  props<{ about: IAboutDto }>(),
);

export const getWebsiteAboutDataError = createAction(
  '[Website] GetWebsiteAboutDataError',
  props<{ error: IError }>(),
);

// Get website user protfolio data
export const getUserPortfolioData = createAction(
  '[Website] getUserPortfolioData',
  props<{ id: string }>(),
);

export const getUserPortfolioDataSuccess = createAction(
  '[Website] getUserPortfolioDataSuccess',
  props<{ data: IWebsiteUserState }>(),
);

export const getUserDataPortfolioError = createAction(
  '[Website] getUserDataPortfolioError',
  props<{ error: IError }>(),
);
