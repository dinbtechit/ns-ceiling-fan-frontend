import { Component, OnInit } from '@angular/core';
import { Select, Store } from "@ngxs/store";
import {
  ListenFanEventsAction,
  LoadFanAction,
  PullChord1Action,
  PullChord2Action
} from "./store/fan-state/fan.actions";
import { FanState} from "./store/fan-state/fan.state";
import { Observable } from "rxjs";

export interface FanSettings {
  speed: number
  direction: boolean
}

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit {

  @Select(FanState.settings)
  fanState$: Observable<FanSettings>;

  fanSpeedAnimaton: string

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

  getFanSpeed(speed: number): string {
    switch (speed) {
      case 1:
        return '1s';
      case 2:
        return '0.5s';
      case 3:
        return '0.1s';
      default:
        return '';
    }
  }
}
