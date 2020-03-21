import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { DATA, DIAS } from '../helpers/fake-db';

@Injectable({
  providedIn: 'root'
})
export class TimelineService {

  constructor() { }

  getTimeline(offset, limit) {
    return of(DATA);
  }

  getDiario() {
    return of(DIAS);
  }
}
