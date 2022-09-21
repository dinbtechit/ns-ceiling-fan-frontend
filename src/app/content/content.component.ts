import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {ListenFanEventsAction, LoadFanAction, PullChord1Action, PullChord2Action} from "./store/fan-state/fan.actions";
import {FanState, FanStateModel} from "./store/fan-state/fan.state";
import {Observable} from "rxjs";

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
  fanState$: Observable<FanStateModel>;


  constructor(private store: Store) {
  }

  async ngOnInit(): Promise<void> {
    await this.store.dispatch([new LoadFanAction(), new ListenFanEventsAction()]);
    if (typeof SharedWorker !== 'undefined') {
      // Create a new
      const worker = new SharedWorker('services/manage-sse.worker', import.meta.url);
      worker.port.onmessage = ({ data }) => {
        console.log(`page got message: ${data}`);
      };
      worker.port.postMessage('hello');
    } else {
      // Web workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
    }
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
