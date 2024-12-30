import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISkill, ISkillDto } from '../modals/skills.modal';

@Injectable({ providedIn: 'root' })
export class SkillsService {
  constructor(private http: HttpClient) {}

  addSkills(payload: ISkill) {
    return this.http.post<ISkillDto>('/user-skill', payload);
  }

  getSkills() {
    return this.http.get<ISkillDto>('/user-skill');
  }

  updateSkills(payload: ISkillDto, id: string) {
    return this.http.patch<ISkillDto>(`/user-skill/${id}`, payload);
  }
}
