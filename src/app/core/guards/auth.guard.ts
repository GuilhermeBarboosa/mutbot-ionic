import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CanActivateChild, UrlTree } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild {

  constructor(
    private authService: AuthService,
    private snackbarService: SnackbarService
  ) {}

  canActivateChild(): | boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.authService.isLogged()) {
      return true;
    }

    this.snackbarService.error('Você não tem permissão para acessar!');
    this.authService.logout();
    return false;
  }

}
