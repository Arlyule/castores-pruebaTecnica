import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth';

export const roleGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const expectedRole = route.data['role'] as string;
  
  if (!authService.currentUser) {
    return router.navigate(['/login']);
  }

  if (expectedRole && !authService.hasRole(expectedRole)) {
    // If user doesn't have the required role, redirect them to a safe place
    return router.navigate(['/dashboard']);
  }

  return true;
};
