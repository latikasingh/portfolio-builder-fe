import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../modals/user.modal';
import { ISignupDto } from '../modals/auth.modal';

export interface IAuthRes {
  user: IUser;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<IAuthRes>('/user/signin', { email, password });
  }

  logout() {
    return this.http.post('/user/logout', {});
  }

  getLoggedInUser() {
    return this.http.get<{ user: IUser }>('/user');
  }

  updateUser(user: IUser, id: string) {
    return this.http.patch<{ user: IUser }>(`/user/${id}`, { ...user });
  }

  signup(payload: ISignupDto) {
    return this.http.post<IAuthRes>('/user/signup', payload);
  }

  getUserToken() {
    const token = localStorage.getItem('authToken');
    if (token) {
      return token;
    }
    return null;
  }
}
