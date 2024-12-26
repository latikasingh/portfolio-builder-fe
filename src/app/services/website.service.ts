import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../modals/user.modal';

@Injectable({
  providedIn: 'root',
})
export class WebsiteService {
  constructor(private http: HttpClient) {}

  getUserById(id: string) {
    return this.http.get<{ user: IUser }>(`/user/${id}`);
  }
}
