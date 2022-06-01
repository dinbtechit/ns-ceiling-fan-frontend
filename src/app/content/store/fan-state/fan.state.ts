import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { ErrorAction, ListenFanEventsAction, LoadFanAction, PullChord1Action, PullChord2Action } from './fan.actions';
import { FanSettings } from "../../content.component";
import { FanHttpService } from "../../services/fan-http.service";

export interface FanStateModel {
  settings: FanSettings;
  httpError: HttpError;
}

export interface HttpError {
  status: boolean;
  message?: string;
}

const defaults: FanStateModel = {
  settings: {
    speed: 0,
    direction: true
  },
  httpError: { status: false }
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
  static settings(state: FanStateModel): FanStateModel {
    return state;
  }

  @Action(LoadFanAction)
  async load(ctx: StateContext<FanStateModel>, { payload }: LoadFanAction) {
    try {
      const fanState = await this.fanHttpService.getFanStatus();
      ctx.patchState({
        httpError: { status: false, message: ''},
        settings: fanState
      });
    } catch (e) {
      ctx.dispatch(new ErrorAction(e.message));
    }
  }

  @Action(ListenFanEventsAction, { cancelUncompleted: true })
  async listenFanEvents(ctx: StateContext<FanStateModel>) {
    try {
      await this.fanHttpService.fetchForEvents((e) => {
        ctx.dispatch(new LoadFanAction());
      }, (err) => {
        ctx.dispatch(new ErrorAction(err.message));
      });
    } catch (e) {
      ctx.dispatch(new ErrorAction(e.message));
    }
  }

  @Action(PullChord1Action)
  async pullChord1(ctx: StateContext<FanStateModel>) {
    try {
      await this.fanHttpService.sendPullCode1Req()
      ctx.patchState({
        settings: ctx.getState().settings
      })
    } catch (e) {
      ctx.dispatch(new ErrorAction(e.message));
    }
  }

  @Action(PullChord2Action)
  async pullChord2(ctx: StateContext<FanStateModel>) {
    try {
      await this.fanHttpService.sendPullCode2Req()
    } catch (e) {
      ctx.dispatch(new ErrorAction(e.message));
    }
  }

  @Action(ErrorAction)
  handleError(ctx: StateContext<FanStateModel>, { payload }: ErrorAction) {
    ctx.patchState({
      httpError: {
        status: true,
        message: payload
      }
    });
  }

}
