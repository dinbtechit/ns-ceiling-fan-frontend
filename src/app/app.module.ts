import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ContentComponent } from './content/content.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { NgxsModule } from "@ngxs/store";
import { environment } from "../environments/environment";
import { FanState } from "./content/store/fan-state/fan.state";
import { HttpClientModule } from "@angular/common/http";
import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ErrorOverlayComponent } from './content/components/error-overlay/error-overlay.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ContentComponent,
    ErrorOverlayComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule,
    NgxsModule.forRoot([FanState], { developmentMode: !environment.production }),
    NgxsReduxDevtoolsPluginModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
