import { ActionReducerMap } from '@ngrx/store';
import { authReducer, IAuthState } from './auth/auth.reducer';
import {
  IWebsiteUserState,
  websiteUserReducer,
} from './website/user/user.reducer';

export interface AppState {
  auth: IAuthState;
  websiteUser: IWebsiteUserState;
}

export const appReducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  websiteUser: websiteUserReducer,
};
