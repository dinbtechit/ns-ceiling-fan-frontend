import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { ListenFanEventsAction, LoadFanAction, PullChord1Action, PullChord2Action } from './fan.actions';
import { FanSettings } from "../../content.component";
import { FanHttpService } from "../../services/fan-http.service";
import { EventSourceMessage, fetchEventSource } from "@microsoft/fetch-event-source";

export interface FanStateModel {
  settings: FanSettings;
}

const defaults: FanStateModel = {
  settings: {
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

  @Selector()
  static settings(state: FanStateModel): FanSettings {
    return state.settings;
  }

  @Action(LoadFanAction)
  async load(ctx: StateContext<FanStateModel>, { payload }: LoadFanAction ) {
    const fanState = await this.fanHttpService.getFanStatus();
    ctx.patchState({
      settings: fanState
    });
  }

  @Action(ListenFanEventsAction, {cancelUncompleted: true})
  async listenFanEvents(ctx: StateContext<FanStateModel>) {
    await this.fanHttpService.fetchForEvents((e) => {
      ctx.dispatch(new LoadFanAction());
    });
  }

  @Action(PullChord1Action)
  async pullChord1(ctx: StateContext<FanStateModel>) {
    await this.fanHttpService.sendPullCode1Req()
    ctx.patchState({
      settings: ctx.getState().settings
    })
  }

  @Action(PullChord2Action)
  async pullChord2(ctx: StateContext<FanStateModel>) {
    await this.fanHttpService.sendPullCode2Req()
  }
}
