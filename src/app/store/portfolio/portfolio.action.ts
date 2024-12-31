import { createAction, props } from '@ngrx/store';
import { IError } from '../../modals/error.modal';
import { IPortfolio, IPortfolioDto } from '../../modals/portfolio.modal';

// add portfolio data
export const addPortfolioData = createAction(
  '[User] AddPortfolioData',
  props<{ payload: IPortfolio; images: any }>(),
);

export const addPortfolioDataSuccess = createAction(
  '[User] AddPortfolioDataSuccess',
  props<{ data: IPortfolioDto }>(),
);

export const addPortfolioDataError = createAction(
  '[User] AddPortfolioDataError',
  props<{ error: IError }>(),
);

// update portfolio data
export const updatePortfolioData = createAction(
  '[User] UpdatePortfolioData',
  props<{ payload: IPortfolio; images: any; id: string }>(),
);

export const updatePortfolioDataSuccess = createAction(
  '[User] UpdatePortfolioDataSuccess',
  props<{ data: IPortfolioDto }>(),
);

export const updatePortfolioDataError = createAction(
  '[User] UpdatePortfolioDataError',
  props<{ error: IError }>(),
);

// delete portfolio data
export const deletePortfolioData = createAction(
  '[User] DeletePortfolioData',
  props<{ id: string }>(),
);

export const deletePortfolioDataSuccess = createAction(
  '[User] DeletePortfolioDataSuccess',
  props<{ id: string }>(),
);

export const deletePortfolioDataError = createAction(
  '[User] DeletePortfolioDataError',
  props<{ error: IError }>(),
);

// get portfolio data
export const getPortfolioData = createAction('[User] GetPortfolioData');

export const getPortfolioDataSuccess = createAction(
  '[User] GetPortfolioDataSuccess',
  props<{ data: IPortfolioDto[] }>(),
);

export const getPortfolioDataError = createAction(
  '[User] GetPortfolioDataError',
  props<{ error: IError }>(),
);
