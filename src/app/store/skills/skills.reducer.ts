import { createReducer, on } from '@ngrx/store';
import { IError } from '../../modals/error.modal';
import { ISkillDto } from '../../modals/skills.modal';
import {
  getSkillData,
  getSkillDataError,
  getSkillDataSuccess,
  postSkillData,
  postSkillDataError,
  postSkillDataSuccess,
  updateSkillData,
  updateSkillDataError,
  updateSkillDataSuccess,
} from './skills.action';

export interface ISkillsState {
  loading: boolean;
  skills: ISkillDto;
  error: IError;
}

export const initialState: ISkillsState = {
  loading: false,
  skills: null,
  error: null,
};

export const skillsReducer = createReducer(
  initialState,

  // Post user skills data
  on(postSkillData, (state) => ({ ...state, loading: true })),
  on(postSkillDataSuccess, (state, { data }) => ({
    ...state,
    loading: false,
    skills: data,
  })),
  on(postSkillDataError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Update user skills data
  on(updateSkillData, (state) => ({ ...state, loading: true })),
  on(updateSkillDataSuccess, (state, { data }) => ({
    ...state,
    loading: false,
    skills: data,
  })),
  on(updateSkillDataError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // get skills data
  on(getSkillData, (state) => ({ ...state, loading: true })),
  on(getSkillDataSuccess, (state, { data }) => ({
    ...state,
    loading: false,
    skills: data,
  })),
  on(getSkillDataError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);
