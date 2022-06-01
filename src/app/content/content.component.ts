import { Component, OnInit } from '@angular/core';
import { Select, Store } from "@ngxs/store";
import {
  ListenFanEventsAction,
  LoadFanAction,
  PullChord1Action,
  PullChord2Action
} from "./store/fan-state/fan.actions";
import { FanState, FanStateModel } from "./store/fan-state/fan.state";
import { Observable } from "rxjs";

export interface FanSettings {
  speed: number
  direction: boolean
}

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  @Select(FanState.settings)
  fanState$: Observable<FanSettings>;

  constructor(private store: Store) {
  }

  async ngOnInit(): Promise<void> {
    await this.store.dispatch([new LoadFanAction(), new ListenFanEventsAction()]);
  }

  async onCord1Pull() {
    await this.store.dispatch(new PullChord1Action());
  }

  async onCord2Pull() {
    await this.store.dispatch(new PullChord2Action());
  }

}
