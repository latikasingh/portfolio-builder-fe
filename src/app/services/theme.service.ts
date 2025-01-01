import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  constructor(private http: HttpClient) {}

  getCurrentTheme() {
    // return this.http.get<{ theme: string }>('/theme');
    return of({ theme: 'theme2' });
  }
}
