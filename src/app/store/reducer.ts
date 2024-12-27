import { ActionReducerMap } from '@ngrx/store';
import { authReducer, IAuthState } from './auth/auth.reducer';
import {
  IWebsiteUserState,
  websiteUserReducer,
} from './website/user/user.reducer';
import { aboutUserReducer, IAboutUserState } from './about/about.reducer';

export interface AppState {
  auth: IAuthState;
  websiteUser: IWebsiteUserState;
  about: IAboutUserState;
}

export const appReducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  websiteUser: websiteUserReducer,
  about: aboutUserReducer,
};
