import { createAction, props } from '@ngrx/store';
import { IError } from '../../modals/error.modal';
import { IPortfolio, IPortfolioDto } from '../../modals/portfolio.modal';

// add portfolio data
export const addPortfolioData = createAction(
  '[User] PostSkillData',
  props<{ payload: IPortfolio }>(),
);

export const addPortfolioDataSuccess = createAction(
  '[User] PostSkillDataSuccess',
  props<{ data: IPortfolioDto }>(),
);

export const addPortfolioDataError = createAction(
  '[User] PostSkillDataError',
  props<{ error: IError }>(),
);
