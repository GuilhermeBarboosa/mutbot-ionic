import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { RegisterRequest } from "../request/RegisterRequest";

@Injectable({
    providedIn: 'root'
  })

  export class RegisterService {

    private path = 'users/register';

    constructor(
        private httpClient: HttpClient
      ) { }

      create(register: RegisterRequest): Observable<any> {console.log(register)
        return this.httpClient.post<any>(`${environment.api}/${this.path}`, register);
      }
  }