import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private messageSource = new BehaviorSubject(0);
  currentCounter = this.messageSource.asObservable();

  constructor() { }

  changeCounter(count: number) {
    this.messageSource.next(count);
  }
}
