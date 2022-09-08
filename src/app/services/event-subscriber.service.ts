import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class EventSubscriberService {
  public update_event = new BehaviorSubject<any>('');
  
  constructor() { }

  setEvent(text: string) {
    this.update_event.next(text);
  }

  getEvent() {
    return this.update_event.asObservable();
  }
}
