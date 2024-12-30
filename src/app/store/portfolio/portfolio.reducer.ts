import { createReducer, on } from '@ngrx/store';
import { IError } from '../../modals/error.modal';
import { ISkillDto } from '../../modals/skills.modal';
import {
  addPortfolioData,
  addPortfolioDataError,
  addPortfolioDataSuccess,
} from './portfolio.action';
import { IPortfolioDto } from '../../modals/portfolio.modal';

export interface IPortfolioState {
  loading: boolean;
  portfolio: IPortfolioDto;
  error: IError;
}

export const initialState: IPortfolioState = {
  loading: false,
  portfolio: null,
  error: null,
};

export const portfolioReducer = createReducer(
  initialState,

  // Post user skills data
  on(addPortfolioData, (state) => ({ ...state, loading: true })),
  on(addPortfolioDataSuccess, (state, { data }) => ({
    ...state,
    loading: false,
    skills: data,
  })),
  on(addPortfolioDataError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);
