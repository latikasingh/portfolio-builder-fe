import { createAction, props } from '@ngrx/store';
import { IError } from '../../modals/error.modal';
import { ISkill, ISkillDto } from '../../modals/skills.modal';
import { IResume, IResumeDto } from '../../modals/resume.modal';

// Post resume data
export const postResumeData = createAction(
  '[User] PostResumeData',
  props<{ payload: IResume }>(),
);

export const postResumeDataSuccess = createAction(
  '[User] PostResumeDataSuccess',
  props<{ data: IResumeDto }>(),
);

export const postResumeDataError = createAction(
  '[User] PostResumeDataError',
  props<{ error: IError }>(),
);

// update resume data
export const updateResumeData = createAction(
  '[User] UpdateResumeData',
  props<{ payload: IResume; id: string }>(),
);

export const updateResumeDataSuccess = createAction(
  '[User] UpdateResumeDataSuccess',
  props<{ data: IResumeDto }>(),
);

export const updateResumeDataError = createAction(
  '[User] UpdateResumeDataError',
  props<{ error: IError }>(),
);

// Get resume data
export const getResumeData = createAction('[User] GetResumeData');

export const getResumeDataSuccess = createAction(
  '[User] GetResumeDataSuccess',
  props<{ data: IResumeDto[] }>(),
);

export const getResumeDataError = createAction(
  '[User] GetResumeDataError',
  props<{ error: IError }>(),
);

// Delete resume data
export const deleteResumeData = createAction(
  '[User] DeleteResumeData',
  props<{ id: string }>(),
);

export const deleteResumeDataSuccess = createAction(
  '[User] DeleteResumeDataSuccess',
  props<{ id: string }>(),
);

export const deleteResumeDataError = createAction(
  '[User] DeleteResumeDataError',
  props<{ error: IError }>(),
);
