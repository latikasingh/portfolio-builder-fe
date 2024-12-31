import { createAction, props } from '@ngrx/store';
import { IError } from '../../modals/error.modal';
import { IPortfolio, IPortfolioDto } from '../../modals/portfolio.modal';

// add portfolio data
export const addPortfolioData = createAction(
  '[User] AddPortfolioData',
  props<{ payload: IPortfolio }>(),
);

export const addPortfolioDataSuccess = createAction(
  '[User] AddPortfolioDataSuccess',
  props<{ data: IPortfolioDto }>(),
);

export const addPortfolioDataError = createAction(
  '[User] AddPortfolioDataError',
  props<{ error: IError }>(),
);

// add portfolio data
export const getPortfolioData = createAction('[User] GetPortfolioData');

export const getPortfolioDataSuccess = createAction(
  '[User] GetPortfolioDataSuccess',
  props<{ data: IPortfolioDto[] }>(),
);

export const getPortfolioDataError = createAction(
  '[User] GetPortfolioDataError',
  props<{ error: IError }>(),
);
