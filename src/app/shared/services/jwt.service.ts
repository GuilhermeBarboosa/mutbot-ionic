import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  private helper = new JwtHelperService();

  constructor() { }

  tokenIsValid(token: string): boolean {
    return !this.helper.isTokenExpired(token);
  }
}
