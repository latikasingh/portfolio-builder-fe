import { createReducer, on } from '@ngrx/store';
import { IError } from '../../modals/error.modal';
import { IResumeDto } from '../../modals/resume.modal';
import {
  deleteResumeData,
  deleteResumeDataError,
  deleteResumeDataSuccess,
  getResumeData,
  getResumeDataError,
  getResumeDataSuccess,
  postResumeData,
  postResumeDataError,
  postResumeDataSuccess,
  updateResumeData,
  updateResumeDataError,
  updateResumeDataSuccess,
} from './resume.action';

export interface IResumeState {
  loading: boolean;
  resume: IResumeDto[];
  error: IError;
  success: boolean;
  deleteLoading: boolean;
}

export const initialState: IResumeState = {
  loading: false,
  resume: null,
  error: null,
  success: false,
  deleteLoading: false,
};

export const resumeReducer = createReducer(
  initialState,

  // Get resume Data
  on(getResumeData, (state) => ({ ...state, loading: true, success: false })),
  on(getResumeDataSuccess, (state, { data }) => ({
    ...state,
    loading: false,
    resume: data,
  })),
  on(getResumeDataError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Post resume Data
  on(postResumeData, (state) => ({ ...state, loading: true, success: false })),
  on(postResumeDataSuccess, (state, { data }) => ({
    ...state,
    loading: false,
    resume: [...state.resume, data],
    success: true,
  })),
  on(postResumeDataError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    success: false,
  })),

  // Update resume Data
  on(updateResumeData, (state) => ({
    ...state,
    loading: true,
    success: false,
  })),
  on(updateResumeDataSuccess, (state, { data }) => {
    const updatedResume = state.resume.map((resume) =>
      resume.id === data.id ? { ...resume, ...data } : resume,
    );
    return {
      ...state,
      loading: false,
      resume: updatedResume,
      success: true,
    };
  }),
  on(updateResumeDataError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    success: false,
  })),

  // Delete resume Data
  on(deleteResumeData, (state) => ({
    ...state,
    deleteLoading: true,
  })),
  on(deleteResumeDataSuccess, (state, { id }) => {
    const updatedResume = state.resume.filter((resume) => resume.id !== id);
    return {
      ...state,
      deleteLoading: false,
      resume: updatedResume,
    };
  }),
  on(deleteResumeDataError, (state, { error }) => ({
    ...state,
    deleteLoading: false,
    error,
  })),
);
