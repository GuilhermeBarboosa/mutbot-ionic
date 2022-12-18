import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ListParams } from "../interfaces/list-params";
import { Paginable } from "../interfaces/paginable";
import { Tag } from "../interfaces/tag";

@Injectable({
    providedIn: 'root'
  })

  export class TagService {

    private path = 'tags';

    constructor(
        private httpClient: HttpClient
      ) { }

     

      loadAll(): Observable<Paginable<Tag>> {
        const params: ListParams = {
          pageable: false,
          orderBy: 'tag.name'
        };
    
        const finalParams = new HttpParams({
          fromObject: {
            ... params
          }
        });
    
        return this.httpClient.get<Paginable<Tag>>(`${environment.api}/${this.path}`, {
          params: finalParams
        });
      }
  }