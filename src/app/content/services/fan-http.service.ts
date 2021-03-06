import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { EventSourceMessage, fetchEventSource } from "@microsoft/fetch-event-source";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FanHttpService {

  baseUrl = `http://${environment.backendApiHost}:3000/api/v1/fan`
  cordPullPath = 'cord/pull'

  constructor(
    private http: HttpClient
  ) {
  }

  getFanStatus(): Promise<any> {
    return this.http.get(`${this.baseUrl}/status`).toPromise();
  }

  sendPullCode1Req(): Promise<any> {
    return this.http.put(`${this.baseUrl}/${this.cordPullPath}/1`, null).toPromise();
  }

  sendPullCode2Req(): Promise<any> {
    return this.http.put(`${this.baseUrl}/${this.cordPullPath}/2`, null).toPromise();
  }

  async fetchForEvents(onSuccess = (e: EventSourceMessage) => {}, onError = (err: any) => {}) {
    await fetchEventSource(`${this.baseUrl}/${this.cordPullPath}/sse`, {
      onmessage: (e) => onSuccess(e),
      onerror: (err: any) => onError(err)
    });
  }
}
