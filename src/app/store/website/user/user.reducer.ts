import { createReducer, on } from '@ngrx/store';
import { IUser } from '../../../modals/user.modal';
import { IError } from '../../../modals/error.modal';
import {
  getUserDataPortfolioError,
  getUserPortfolioData,
  getUserPortfolioDataSuccess,
  getWebsiteAboutData,
  getWebsiteAboutDataError,
  getWebsiteAboutDataSuccess,
  getWebsiteUserData,
  getWebsiteUserDataError,
  getWebsiteUserDataSuccess,
  setUserId,
} from './user.action';
import { IAboutDto } from '../../../modals/about.modal';
import { ISkill } from '../../../modals/skills.modal';
import { IProtfolioResume } from '../../../modals/resume.modal';
import { IPortfolio } from '../../../modals/portfolio.modal';
import { IServiceDto } from '../../../modals/service.modal';

export interface IWebsiteUserState {
  loading: boolean;
  user: IUser;
  about: IAboutDto;
  skill: ISkill;
  resume: IProtfolioResume[];
  portfolio: IPortfolio[];
  service: IServiceDto;
  error: IError;
  userId: string;
}

export const initialState: IWebsiteUserState = {
  loading: false,
  user: null,
  about: null,
  skill: null,
  resume: [],
  portfolio: [],
  service: null,
  error: null,
  userId: null,
};

export const websiteUserReducer = createReducer(
  initialState,

  // Set user id
  on(setUserId, (state, { id }) => ({ ...state, userId: id })),

  // Get website user data
  on(getWebsiteUserData, (state) => ({ ...state, loading: true })),
  on(getWebsiteUserDataSuccess, (state, { user }) => ({
    ...state,
    loading: false,
    user,
  })),
  on(getWebsiteUserDataError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Get website about data
  on(getWebsiteAboutData, (state) => ({ ...state, loading: true })),
  on(getWebsiteAboutDataSuccess, (state, { about }) => ({
    ...state,
    loading: false,
    about,
  })),
  on(getWebsiteAboutDataError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Get user portfolio  data
  on(getUserPortfolioData, (state) => ({ ...state, loading: true })),
  on(getUserPortfolioDataSuccess, (state, { data }) => {
    return {
      ...state,
      ...data,
      loading: false,
    };
  }),
  on(getUserDataPortfolioError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);
