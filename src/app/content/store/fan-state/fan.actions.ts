import { FanSettings } from "../../content.component";

export class LoadFanAction {
  static readonly type = '[fan] load';
  constructor(public payload?: FanSettings) {
  }
}

export class ListenFanEventsAction {
  static readonly type = '[fan] events';
}

export class PullChord1Action {
  static readonly type = '[fan] chord 1';
}

export class PullChord2Action {
  static readonly type = '[fan] chord 2';
}
