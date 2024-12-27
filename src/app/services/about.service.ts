import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAbout, IAboutDto } from '../modals/about.modal';

@Injectable({ providedIn: 'root' })
export class AboutService {
  constructor(private http: HttpClient) {}

  getAboutData() {
    return this.http.get<IAboutDto>('/user-about');
  }

  postAboutData(payload: IAbout) {
    return this.http.post<IAboutDto>('/user-about', payload);
  }

  updateAboutData(payload: IAbout, id: string) {
    return this.http.patch<IAboutDto>(`/user-about/${id}`, payload);
  }
}
