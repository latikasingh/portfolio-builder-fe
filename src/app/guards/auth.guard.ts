import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('authToken');
  const router = inject(Router);
  if (!token) {
    router.navigate(['/auth']);
    return false;
  }
  return true;
};
