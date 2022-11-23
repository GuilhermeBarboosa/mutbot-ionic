import { HttpClient, HttpErrorResponse, HttpHeaders, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TestingModule } from 'src/app/shared/modules/testing.module';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

import { ErrorRequestInterceptor } from './error-request.interceptor';

describe('ErrorRequestInterceptor', () => {
  let httpClient: HttpClient;
  let httpController: HttpTestingController;
  let interceptor: ErrorRequestInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestingModule
      ],
      providers: [
        ErrorRequestInterceptor,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ErrorRequestInterceptor,
          multi: true
        }
      ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    const interceptor: ErrorRequestInterceptor = TestBed.inject(ErrorRequestInterceptor);
    expect(interceptor).toBeTruthy();
  });

  it('intercept and add token header', () => {
    const tokenValue = 'TESTING_TOKEN';

    const authService: AuthService = TestBed.inject(AuthService);
    spyOn(authService, 'getToken').and.returnValue(tokenValue);

    httpClient.get('/test').subscribe();

    const request = httpController.expectOne('/test');
    request.flush({}, {
      status: 200,
      statusText: 'OK',
      headers: new HttpHeaders().set('content-type', 'application/json')
    });

    expect(request.request.headers.has('Authorization')).toEqual(true);
    expect(request.request.headers.get('Authorization')).toEqual(`Bearer ${tokenValue}`);
  });

  it('does not intercept others codes error', () => {
    const authService: AuthService = TestBed.inject(AuthService);
    const snackbarService: SnackbarService = TestBed.inject(SnackbarService);

    spyOn(authService, 'logout');
    spyOn(snackbarService, 'error');

    httpClient.get('/test').subscribe({
      next: () => fail('should have failed with the 404 error'),
      error: (error: HttpErrorResponse) => {
        expect(error).toBeTruthy();
      }
    });

    const request = httpController.expectOne('/test');
    request.flush('Error', {
      status: 404,
      statusText: 'Not found'
    });
    expect(snackbarService.error).not.toHaveBeenCalled();
    expect(authService.logout).not.toHaveBeenCalled();
  });

});
