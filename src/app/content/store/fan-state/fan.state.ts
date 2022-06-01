import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { ListenFanEventsAction, LoadFanAction, PullChord1Action, PullChord2Action } from './fan.actions';
import { FanSettings } from "../../content.component";
import { FanHttpService } from "../../services/fan-http.service";
import { fetchEventSource } from "@microsoft/fetch-event-source";

export interface FanStateModel {
  fanState: FanSettings;
}

const defaults: FanStateModel = {
  fanState: {
    speed: 0,
    direction: true
  }
};

@State<FanStateModel>({
  name: 'fan',
  defaults
})
@Injectable()
export class FanState {

  constructor(private fanHttpService: FanHttpService) {
  }

  @Action(LoadFanAction)
  async load(ctx: StateContext<FanStateModel>, { payload }: LoadFanAction ) {
    const fanState = await this.fanHttpService.getFanStatus();
    ctx.patchState({
      fanState: fanState
    });
  }

  @Action(ListenFanEventsAction, {cancelUncompleted: true})
  async listenFanEvents(ctx: StateContext<FanStateModel>) {
    let fanSettings: FanSettings = ctx.getState().fanState;
    await fetchEventSource('http://192.168.195.128:3000/api/v1/fan/cord/pull/sse', {
      onmessage(ev) {
        fanSettings = {
            speed: Number((ev.data as any).speed),
            direction: (ev.data as any).direction === 'true'
        }
        ctx.dispatch(new LoadFanAction());
      }
    });
  }

  @Action(PullChord1Action)
  async pullChord1(ctx: StateContext<FanStateModel>) {
    await this.fanHttpService.sendPullCode1Req()
    ctx.patchState({
      fanState: ctx.getState().fanState
    })
  }

  @Action(PullChord2Action)
  async pullChord2(ctx: StateContext<FanStateModel>) {
    await this.fanHttpService.sendPullCode2Req()
  }
}
