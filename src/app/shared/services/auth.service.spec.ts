import { USERNAME_KEY, EMAIL_KEY, ROLES_KEY } from './../constants/auth.constants';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from './local-storage.service';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from 'src/app/features/login/login.component';
import { TestingModule } from '../modules/testing.module';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { JwtService } from './jwt.service';
import { TOKEN_KEY } from '../constants/auth.constants';
import { HttpTestingController } from '@angular/common/http/testing';
import { LoginResponse } from '../interfaces/LoginResponse.interface';

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;

  const loginResponseMock: LoginResponse = {
    token: 'token',
    type: 'type',
    id: 1,
    username: 'username',
    email: 'email',
    roles: []
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestingModule,
        RouterTestingModule.withRoutes([
          { path: 'entrar', component: LoginComponent}
        ])
      ]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(AuthService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('make request login and sets all infos in local storage', () => {
    const login = 'teste';
    const password= 'teste'
    const localStorageService: LocalStorageService = TestBed.inject(LocalStorageService);
    spyOn(localStorageService, 'setItem');

    service.login(login, password).subscribe(() => {
      expect(localStorageService.setItem).toHaveBeenCalledWith(TOKEN_KEY, loginResponseMock.token);
      expect(localStorageService.setItem).toHaveBeenCalledWith(USERNAME_KEY, loginResponseMock.username);
      expect(localStorageService.setItem).toHaveBeenCalledWith(EMAIL_KEY, loginResponseMock.email);
      expect(localStorageService.setItem).toHaveBeenCalledWith(ROLES_KEY, loginResponseMock.roles.join(" "));
    });

    const request = httpTestingController.expectOne(`${environment.api}/auth/login`);

    expect(request.request.method).toEqual('POST');
    expect(request.request.body).toEqual('grant_type=password&username=teste&password=teste');
    request.flush(loginResponseMock);
  });

  it('reset all on logout', () => {
    const localStorageService: LocalStorageService = TestBed.inject(LocalStorageService);
    const router: Router = TestBed.inject(Router);
    spyOn(localStorageService, 'clear');
    spyOn(router, 'navigateByUrl');
    service.logout();
    expect(localStorageService.clear).toHaveBeenCalled();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/entrar');
  });

  it('returns false if token is invalid', () => {
    const jwtService: JwtService = TestBed.inject(JwtService);
    spyOn(service, 'getToken').and.returnValue('token');
    spyOn(jwtService, 'tokenIsValid').and.returnValue(false);
    expect(service.isLogged()).toBeFalsy();
  });

  it('returns true if it is logged', () => {
    const jwtService: JwtService = TestBed.inject(JwtService);
    spyOn(service, 'getToken').and.returnValue('token');
    spyOn(jwtService, 'tokenIsValid').and.returnValue(true);
    expect(service.isLogged()).toBeTruthy();
  });

  it('returns token', () => {
    const tokenValue = 'token';
    const localStorageService: LocalStorageService = TestBed.inject(LocalStorageService);
    spyOn(localStorageService, 'getItem').and.returnValue(tokenValue);
    expect(service.getToken()).toEqual(tokenValue);
  });

  it('returns username', () => {
    const usernameValue = 'test';
    const localStorageService: LocalStorageService = TestBed.inject(LocalStorageService);
    spyOn(localStorageService, 'getItem').and.returnValue(usernameValue);
    expect(service.getUsername()).toEqual(usernameValue);
  });

  it('returns email', () => {
    const emailValue = 'email@test.com';
    const localStorageService: LocalStorageService = TestBed.inject(LocalStorageService);
    spyOn(localStorageService, 'getItem').and.returnValue(emailValue);
    expect(service.getEmail()).toEqual(emailValue);
  });

  it('returns roles', () => {
    const rolesValue = ['role1', 'role2'];
    const localStorageService: LocalStorageService = TestBed.inject(LocalStorageService);
    spyOn(localStorageService, 'getItem').and.returnValue(rolesValue.join(' '));
    expect(service.getRoles()).toEqual(rolesValue);
  });
});
