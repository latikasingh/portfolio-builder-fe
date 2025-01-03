import { ActionReducerMap } from '@ngrx/store';
import { authReducer, IAuthState } from './auth/auth.reducer';
import { IWebsiteState, websiteUserReducer } from './website/user/user.reducer';
import { aboutUserReducer, IAboutUserState } from './about/about.reducer';
import { ISkillsState, skillsReducer } from './skills/skills.reducer';
import { IResumeState, resumeReducer } from './resume/resume.reducer';
import {
  IPortfolioState,
  portfolioReducer,
} from './portfolio/portfolio.reducer';
import { IServiceState, serviceReducer } from './service/service.reducer';
import { IThemeState, themeReducer } from './theme/theme.reducer';

export interface AppState {
  auth: IAuthState;
  website: IWebsiteState;
  about: IAboutUserState;
  skills: ISkillsState;
  resume: IResumeState;
  portfolio: IPortfolioState;
  service: IServiceState;
  theme: IThemeState;
}

export const appReducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  website: websiteUserReducer,
  about: aboutUserReducer,
  skills: skillsReducer,
  resume: resumeReducer,
  portfolio: portfolioReducer,
  service: serviceReducer,
  theme: themeReducer,
};
