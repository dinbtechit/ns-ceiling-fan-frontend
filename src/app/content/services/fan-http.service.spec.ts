import { TestBed } from '@angular/core/testing';

import { FanHttpService } from './fan-http.service';

describe('FanHttpService', () => {
  let service: FanHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FanHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
