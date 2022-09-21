import { Component, OnInit } from '@angular/core';
import {FanState, FanStateModel} from "../../store/fan-state/fan.state";
import {Observable} from "rxjs";
import {Select} from "@ngxs/store";

@Component({
  selector: 'app-error-overlay',
  templateUrl: './error-overlay.component.html',
  styleUrls: ['./error-overlay.component.scss']
})
export class ErrorOverlayComponent {

  @Select(FanState.settings)
  fanState$: Observable<FanStateModel>;

}
