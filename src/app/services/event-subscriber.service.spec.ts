import { TestBed } from '@angular/core/testing';

import { EventSubscriberService } from './event-subscriber.service';

describe('EventSubscriberService', () => {
  let service: EventSubscriberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventSubscriberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
