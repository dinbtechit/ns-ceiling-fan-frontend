import { TestBed, waitForAsync } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { FanState} from './fan.state';
import { LoadFanAction, PullChord1Action, PullChord2Action } from "./fan.actions";
import { FanSettings } from "../../content.component";
import { FanHttpService } from "../../services/fan-http.service";
import { FanHttpServiceStub } from "../../services/fan-http.service.stub";
import { HttpClientTestingModule } from "@angular/common/http/testing";


describe('Fan actions', () => {
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NgxsModule.forRoot([FanState])
      ],
      providers: [
        FanHttpService,
        { provide: FanHttpService, useClass: FanHttpServiceStub }
      ]
    }).compileComponents();
    store = TestBed.inject(Store);
  });

  it('should create an action and load fan settings', waitForAsync(() => {
    store.dispatch(new LoadFanAction());
    store.select(state => state.fan.settings).subscribe((fan: FanSettings) => {
      expect(fan).toEqual(jasmine.objectContaining({
        speed: 0,
        direction: true
      }));
    });
  }));

  it('should cycle speed when cord1 is pulled twice', waitForAsync(() => {
    store.dispatch(new PullChord1Action()).toPromise().then((v) => {
      console.log(v);
      store.select(state => state.fan.settings).subscribe((fan: FanSettings) => {
        console.log(`items: ${JSON.stringify(fan)}`);
        expect(fan).toEqual(jasmine.objectContaining({
          speed: 1,
          direction: true
        }));
      });
    });


  }));

  it('should reverse direction when cord2 is pulled', waitForAsync(() => {
    store.dispatch(new LoadFanAction()).toPromise();
    store.dispatch(new PullChord2Action()).toPromise().then((v) => {
      store.select(state => state.fan.settings).subscribe((fan: FanSettings) => {
        console.log(`items: ${JSON.stringify(fan)}`);
        expect(fan).toEqual(jasmine.objectContaining({
          speed: 0,
          direction: false
        }));
      });
    });
  }));
});
