import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../modals/user.modal';
import { IAboutDto } from '../modals/about.modal';

@Injectable({
  providedIn: 'root',
})
export class WebsiteService {
  constructor(private http: HttpClient) {}

  getUserById(id: string) {
    return this.http.get<{ user: IUser }>(`/user/${id}`);
  }

  getUserAboutData(id: string) {
    return this.http.get<IAboutDto>(`/user-about/${id}`);
  }

  getUserPortfolioData(id: string) {
    return this.http.get<any>(`/portfolio/${id}`);
  }
}
