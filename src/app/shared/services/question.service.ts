import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ListParams } from "../interfaces/list-params";
import { Paginable } from "../interfaces/paginable";
import { Question } from "../interfaces/question";
import { QuestionRequest } from "../request/QuestionResquest";

@Injectable({
    providedIn: 'root'
  })

  export class QuestionService {

    private path = 'questions';

    constructor(
        private httpClient: HttpClient
      ) { }

      create(question: QuestionRequest): Observable<any> {console.log(question)
        return this.httpClient.post<any>(`${environment.api}/${this.path}`, question);
      }

      load(params: ListParams, tag?:number): Observable<Paginable<Question>> {
        let finalParams
        if(tag) {
          let filter = {tagId: tag}
          finalParams = new HttpParams({
            fromObject: {
              ... params,
              ...filter
            }
          });
        } else {
          finalParams = new HttpParams({
            fromObject: {
              ... params
            }
          });
        }
       
    
        return this.httpClient.get<Paginable<Question>>(`${environment.api}/${this.path}`, {
          params: finalParams
        });
      }
  }