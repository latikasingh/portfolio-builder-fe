import { createAction, props } from '@ngrx/store';
import { IError } from '../../modals/error.modal';
import { ISkill, ISkillDto } from '../../modals/skills.modal';

// Post skill data
export const postSkillData = createAction(
  '[User] PostSkillData',
  props<{ payload: ISkill }>(),
);

export const postSkillDataSuccess = createAction(
  '[User] PostSkillDataSuccess',
  props<{ data: ISkillDto }>(),
);

export const postSkillDataError = createAction(
  '[User] PostSkillDataError',
  props<{ error: IError }>(),
);

// Get skill data
export const getSkillData = createAction('[User] GetSkillData');

export const getSkillDataSuccess = createAction(
  '[User] GetSkillDataSuccess',
  props<{ data: ISkillDto }>(),
);

export const getSkillDataError = createAction(
  '[User] GetSkillDataError',
  props<{ error: IError }>(),
);

// Update skill data
export const updateSkillData = createAction(
  '[User] UpdateSkillData',
  props<{ payload: ISkillDto; id: string }>(),
);

export const updateSkillDataSuccess = createAction(
  '[User] UpdateSkillDataSuccess',
  props<{ data: ISkillDto }>(),
);

export const updateSkillDataError = createAction(
  '[User] UpdateSkillDataError',
  props<{ error: IError }>(),
);
