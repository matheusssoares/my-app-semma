import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class EventSubscriberService {
  private storage: Storage;
  public update_event = new BehaviorSubject<any>('');

  constructor() {
    this.storage = window.localStorage;
  }

  setEvent(text: string) {
    this.update_event.next(text);
  }

  getEvent() {
    return this.update_event.asObservable();
  }

  setLocal(key: string, value: any) {
    this.storage.setItem(key, JSON.stringify(value));
  }

  getLocal(key: string) {
    if (this.storage) {
      return JSON.parse(this.storage.getItem(key)!);
    }
    return null;
  }

  removeLocal(key: string): boolean {
    if (this.storage) {
      this.storage.removeItem(key);
      return true;
    }
    return false;
  }
}
