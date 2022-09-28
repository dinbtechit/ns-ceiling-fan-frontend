import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EventSourceMessage, fetchEventSource} from "@microsoft/fetch-event-source";
import {environment} from "../../../environments/environment";
import {firstValueFrom} from "rxjs";

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
    return firstValueFrom(this.http.put(`${this.baseUrl}/${this.cordPullPath}/1`, null));
  }

  sendPullCode2Req(): Promise<any> {
    return firstValueFrom(this.http.put(`${this.baseUrl}/${this.cordPullPath}/2`, null));
  }

  async fetchForEvents(onSuccess = (e: EventSourceMessage) => {
  }, onError = (err: any) => {
  }, reload = () => {
  }) {

    const swRegistration = await navigator.serviceWorker.getRegistration()

    if (!swRegistration) {
      console.warn('DevMode - SSE Direct. Limit max 6 concurrent tabs (This warning should not appear in PROD mode.)');
      await fetchEventSource(`${this.baseUrl}/${this.cordPullPath}/sse`, {
        onmessage: (e) => onSuccess(e),
        onerror: (err: any) => onError(err),
        onopen: (res) => {
          if (res.ok && res.status === 200) {
            reload();
          } else if (
            res.status >= 400 &&
            res.status < 500 &&
            res.status !== 429
          ) {
            console.log("Client side error ", res);
          }
          return Promise.resolve();
        },

      });
    } else {
      navigator.serviceWorker.addEventListener('message', event => onSuccess(event.data));
    }


  }
}
