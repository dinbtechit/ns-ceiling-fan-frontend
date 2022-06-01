import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { FanSettings } from "../content.component";
import { EventSourceMessage} from "@microsoft/fetch-event-source";

const fanState: FanSettings = {
  speed: 0,
  direction: true
}

class MockEventSource {
  static lastInstance: MockEventSource;
  constructor(url: string) {
    MockEventSource.lastInstance = this;
  }

  onmessage: (message: any) => any;
}

@Injectable({
  providedIn: 'root'
})
export class FanHttpServiceStub {

  baseUrl = 'http://192.168.195.128:3000/api/v1/fan'
  cordPullPath = 'cord/pull'

  constructor(
    private http: HttpClient
  ) {
  }

  getFanStatus(): Promise<any> {
    return new Promise<FanSettings>(resolve => fanState);
  }

  sendPullCode1Req(): Promise<any> {
    const newFanSpeed = fanState.speed + 1;
    fanState.speed = newFanSpeed >= 4 ? 0 : newFanSpeed;
    return new Promise(resolve => {});
  }

  sendPullCode2Req(): Promise<any> {
    fanState.direction = !fanState.direction;
    return new Promise(resolve => {});
  }

  async fetchForEvents(callback = (e: EventSourceMessage) => {}) {
    MockEventSource.lastInstance.onmessage({ data: JSON.stringify(fanState) });
  }

}
