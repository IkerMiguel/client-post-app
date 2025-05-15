import { CanMatchFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

export const authenticatedGuard: CanMatchFn = async (route, segments) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthenticated = await firstValueFrom(authService.checkStatus());
  
  if (!isAuthenticated) {
    router.navigateByUrl('/auth/login');
    return false;
  }

  return true;
};
