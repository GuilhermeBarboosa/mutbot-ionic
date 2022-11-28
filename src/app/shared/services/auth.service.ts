import { LocalStorageService } from './local-storage.service';
import { environment } from './../../../environments/environment';
import { Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from './jwt.service';
import { EMAIL_KEY, ROLES_KEY, TOKEN_KEY, USERNAME_KEY } from '../constants/auth.constants';
import { LoginResponse } from '../interfaces/LoginResponse.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  userLoggedId: number;
  constructor(
    private jwtService: JwtService,
    private httpClient: HttpClient,
    private router: Router,
    private localStorageService: LocalStorageService
  ) { }

  login(userName: string, password: string ): Observable<LoginResponse>{
    console.log(userName, password)
    const header = new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded')
                    .append('Authorization', `Basic ${environment.AUTHORIZATION_KEY}`);

    const body = `grant_type=password&username=${userName}&password=${password}`;

    return this.httpClient.post<LoginResponse>(`${environment.api}/auth/login`, body,{
      headers: header
    }).pipe(tap(data  => {
      this.userLoggedId = data.id;
      this.localStorageService.setItem(TOKEN_KEY, data.token);
      this.localStorageService.setItem(USERNAME_KEY, data.username);
      this.localStorageService.setItem(EMAIL_KEY, data.email);
      this.localStorageService.setItem(ROLES_KEY, data.roles.join(" "));
    }));
  }
  
  logout(): void {
    this.localStorageService.clear();
    this.router.navigateByUrl('/entrar');
  }

  isLogged(): boolean {
    return !!this.getToken() && this.jwtService.tokenIsValid(this.getToken());
  }

  getToken(): string {
    return this.localStorageService.getItem(TOKEN_KEY);
  }

  getUsername(): string {
    return this.localStorageService.getItem(USERNAME_KEY);
  }

  getEmail(): string {
    return this.localStorageService.getItem(EMAIL_KEY);
  }

  getRoles(): string[] {
    const rolesText = this.localStorageService.getItem(ROLES_KEY);
    return rolesText.split(' ');
  }

}
