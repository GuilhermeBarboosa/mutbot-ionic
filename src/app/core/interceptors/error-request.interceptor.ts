import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpInterceptor,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ErrorResponse } from './interfaces/error-response';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SnackType } from 'src/app/shared/services/snackbar.service';


@Injectable()
export class ErrorRequestInterceptor implements HttpInterceptor {
  errorResponse: ErrorResponse;

  constructor(
    private authService: AuthService) { }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.authService.getToken();
    const requestWithToken = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`),
    });

    return next.handle(requestWithToken).pipe(
      catchError((error: unknown) => {
        const err = error as any;
        if (err instanceof HttpErrorResponse) {
          if (err.status >= 500 || err.error.type == SnackType.ERROR || !err.error.type) {
            this.errorResponse = {
              type: SnackType.ERROR,
              description: 'Não foi possível realizar essa ação, entre em contato com o administrador do sistema',
            };
            return throwError(() => this.errorResponse);

          } else if (err.status === 401) {
            this.errorResponse = {
              type: SnackType.WARNING,
              description: 'Sessão expirada!',
            };

            this.authService.logout();
            return throwError(() => (this.errorResponse));
          } else {
            this.errorResponse = {
              type: err.error.type.toString().toLowerCase(),
              description: err.error.message,
            };
            return throwError(() => this.errorResponse);
          }
        }
        return throwError(() => error);
      })
    );
  }
}
