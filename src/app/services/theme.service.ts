import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { IThemes } from '../modals/themes.modal';
import { IUser } from '../modals/user.modal';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  constructor(private http: HttpClient) {}

  getCurrentTheme() {
    return this.http.get<IThemes>(`/theme`);
    // return of({ theme: 'theme2' });
  }

  updateTheme(id: string) {
    return this.http.patch<{ user: IUser }>(`/theme`, { id });
  }

  getThemeList() {
    return this.http.get<IThemes[]>('/themes');
    // return of([
    //   {
    //     name: 'Default Theme',
    //     img: '/assets/img/default-theme.png',
    //     description:
    //       'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore, consectetur.',
    //   },
    // ]);
  }
}
