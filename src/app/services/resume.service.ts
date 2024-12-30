import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResume, IResumeDto } from '../modals/resume.modal';

@Injectable({ providedIn: 'root' })
export class ResumeService {
  constructor(private http: HttpClient) {}

  getResumeData() {
    return this.http.get<IResumeDto[]>('/user-resume');
  }

  postResume(payload: IResume) {
    return this.http.post<IResumeDto>('/user-resume', payload);
  }

  updateResume(data: IResume, id: string) {
    return this.http.patch<IResumeDto>(`/user-resume/${id}`, data);
  }

  deleteResume(id: string) {
    return this.http.delete(`/user-resume/${id}`);
  }
}
