import { createReducer, on } from '@ngrx/store';
import { IError } from '../../modals/error.modal';
import { ISkillDto } from '../../modals/skills.modal';
import {
  addPortfolioData,
  addPortfolioDataError,
  addPortfolioDataSuccess,
  deletePortfolioData,
  deletePortfolioDataSuccess,
  getPortfolioData,
  getPortfolioDataError,
  getPortfolioDataSuccess,
  updatePortfolioData,
  updatePortfolioDataError,
  updatePortfolioDataSuccess,
} from './portfolio.action';
import { IPortfolioDto } from '../../modals/portfolio.modal';

export interface IPortfolioState {
  getLoading: boolean;
  deleteLoading: boolean;
  loading: boolean;
  portfolio: IPortfolioDto[];
  error: IError;
}

export const initialState: IPortfolioState = {
  getLoading: false,
  deleteLoading: false,
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

  // Update portfolio data
  on(updatePortfolioData, (state) => ({ ...state, loading: true })),
  on(updatePortfolioDataSuccess, (state, { data }) => ({
    ...state,
    loading: false,
    portfolio: [...state.portfolio].map((portfolio) =>
      portfolio.id === data.id ? data : portfolio,
    ),
  })),
  on(updatePortfolioDataError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Delete portfolio data
  on(deletePortfolioData, (state) => ({ ...state, deleteLoading: true })),
  on(deletePortfolioDataSuccess, (state, { id }) => ({
    ...state,
    deleteLoading: false,
    portfolio: [...state.portfolio].filter((portfolio) => portfolio.id !== id),
  })),
  on(updatePortfolioDataError, (state, { error }) => ({
    ...state,
    deleteLoading: false,
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
