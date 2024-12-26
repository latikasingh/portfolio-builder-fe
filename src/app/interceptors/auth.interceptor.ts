import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AlertService } from '../services/alert.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const alertService = inject(AlertService);
  const excludedRoutes = ['/signup', '/signin'];

  let modifiedReq = req;

  if (!excludedRoutes.some((route) => req.url.includes(route))) {
    const token = localStorage.getItem('authToken');
    if (token) {
      modifiedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  }

  return next(modifiedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 410 || error.status === 401) {
        localStorage.removeItem('authToken');
        router.navigate(['auth']);
      }
      return throwError(() => error);
    }),
  );
};
