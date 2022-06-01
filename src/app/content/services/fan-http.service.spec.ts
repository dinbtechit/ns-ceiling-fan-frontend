import { TestBed } from '@angular/core/testing';

import { FanHttpService } from './fan-http.service';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { FanHttpServiceStub } from "./fan-http.service.stub";

describe('FanHttpService', () => {
  let service: FanHttpService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ], providers: [
        { provide: FanHttpService, useClass: FanHttpServiceStub }
      ]
    });
    service = TestBed.inject(FanHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
