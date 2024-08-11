import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const userExists = localStorage.getItem("localUser") != null;
  if (userExists) {
    return true
  } else {
    router.navigate(['/login']);
    return false;
  }
};