import { Injectable } from '@angular/core';
import { v4 } from 'uuid';


@Injectable({
  providedIn: 'root'
})
export class UuidService {

  constructor() { }

  generate(): string {
    return v4();
  }
}
