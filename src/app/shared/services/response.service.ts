import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ListParams } from "../interfaces/list-params";
import { Paginable } from "../interfaces/paginable";
import { ResponseRequest } from "../request/ResponseRequest";
;

@Injectable({
    providedIn: 'root'
  })

  export class ResponseService {

    private path = 'responses';

    constructor(
        private httpClient: HttpClient
      ) { }

      create(response: ResponseRequest): Observable<any> {console.log(response)
        return this.httpClient.post<any>(`${environment.api}/${this.path}`, response);
      }

      load(params: ListParams, questionIdParam: number): Observable<Paginable<Response>> {
        let param = {questionId: questionIdParam}
        const finalParams = new HttpParams({
          fromObject: {
            ... params,
            ... param
          }
        });
    
        return this.httpClient.get<Paginable<Response>>(`${environment.api}/${this.path}`, {
          params: finalParams
        });
      }
  }