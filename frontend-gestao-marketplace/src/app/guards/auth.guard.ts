import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserAuthService } from '../services/user-auth.service';
import { UsersService } from '../services/users.service';
import { firstValueFrom, take } from 'rxjs';

export const authGuard: CanActivateFn = async (route, state) => {
  const _usersService = inject(UsersService);
  const _userAuthService = inject(UserAuthService);
  const _router = inject(Router);

  const token = _userAuthService.getUserToken();
  if (!token) {
    return _router.navigate(['/login']);
  }

  try {
    await firstValueFrom(_usersService.validateUser());

    // Usuário já autenticado e quer acessar outra rota -> entra no sistema
    return true;
  } catch (error) {
    // Token inválido -> retorna login
    return _router.navigate(['/login']);
  }
};
