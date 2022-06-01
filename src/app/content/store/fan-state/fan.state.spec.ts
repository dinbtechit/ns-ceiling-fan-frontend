import { TestBed, waitForAsync } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { FanState } from './fan.state';
import { FanAction } from './fan.actions';

describe('Fan actions', () => {
  let store: Store;

  beforeEach(waitForAsync (() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([FanState])]
    }).compileComponents();
    store = TestBed.inject(Store);
  }));

  it('should create an action and add an item', () => {
    store.dispatch(new FanAction('item-1'));
    store.select(state => state.fan.items).subscribe((items: string[]) => {
      expect(items).toEqual(jasmine.objectContaining([ 'item-1' ]));
    });
  });

});
