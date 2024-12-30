import { ActionReducerMap } from '@ngrx/store';
import { authReducer, IAuthState } from './auth/auth.reducer';
import {
  IWebsiteUserState,
  websiteUserReducer,
} from './website/user/user.reducer';
import { aboutUserReducer, IAboutUserState } from './about/about.reducer';
import { ISkillsState, skillsReducer } from './skills/skills.reducer';
import { IResumeState, resumeReducer } from './resume/resume.reducer';

export interface AppState {
  auth: IAuthState;
  websiteUser: IWebsiteUserState;
  about: IAboutUserState;
  skills: ISkillsState;
  resume: IResumeState;
}

export const appReducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  websiteUser: websiteUserReducer,
  about: aboutUserReducer,
  skills: skillsReducer,
  resume: resumeReducer,
};
