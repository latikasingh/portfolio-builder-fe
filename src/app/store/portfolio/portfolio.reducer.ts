import { createReducer, on } from '@ngrx/store';
import { IError } from '../../modals/error.modal';
import { ISkillDto } from '../../modals/skills.modal';
import {
  addPortfolioData,
  addPortfolioDataError,
  addPortfolioDataSuccess,
  getPortfolioData,
  getPortfolioDataError,
  getPortfolioDataSuccess,
} from './portfolio.action';
import { IPortfolioDto } from '../../modals/portfolio.modal';

export interface IPortfolioState {
  getLoading: boolean;
  loading: boolean;
  portfolio: IPortfolioDto[];
  error: IError;
}

export const initialState: IPortfolioState = {
  getLoading: false,
  loading: false,
  portfolio: [],
  error: null,
};

export const portfolioReducer = createReducer(
  initialState,

  // Add portfolio data
  on(addPortfolioData, (state) => ({ ...state, loading: true })),
  on(addPortfolioDataSuccess, (state, { data }) => ({
    ...state,
    loading: false,
    portfolio: [...state.portfolio, data],
  })),
  on(addPortfolioDataError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Get portfolio data
  on(getPortfolioData, (state) => ({ ...state, getLoading: true })),
  on(getPortfolioDataSuccess, (state, { data }) => ({
    ...state,
    getLoading: false,
    portfolio: data,
  })),
  on(getPortfolioDataError, (state, { error }) => ({
    ...state,
    getLoading: false,
    error,
  })),
);
