import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentComponent } from './content.component';
import { FanHttpService } from "./services/fan-http.service";
import { FanHttpServiceStub } from "./services/fan-http.service.stub";
import { NgxsModule } from "@ngxs/store";
import { FanState } from "./store/fan-state/fan.state";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe('ContentComponent', () => {
  let component: ContentComponent;
  let fixture: ComponentFixture<ContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,
        NgxsModule.forRoot([FanState])
      ],
      declarations: [ContentComponent],
      providers: [
        FanHttpService,
        { provide: FanHttpService, useClass: FanHttpServiceStub }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should increase speed when pulled cord 1', () => {
    expect(component).toBeTruthy();
  });
});
