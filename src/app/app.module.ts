import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouteReuseStrategy, RouterModule} from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component'
import { AppRoutingModule } from './app-routing.module';

import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { PictureUploaderComponent } from './picture-uploader/picture-uploader.component';
import { MessageBoxComponent } from './message-box/message-box.component';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import {FormsModule} from '@angular/forms';
import {PasswortVergessenComponent} from './passwort-vergessen/passwort-vergessen.component';
import { MustMatchDirective } from './must-match.directive';
import { ValidateValueDirective } from './validate-value.directive';
import { PushNotificationService} from "./push-notification.service";
import { environment} from "../environments/environment";
import { HttpClientModule } from '@angular/common/http'
import {ServiceWorkerModule} from "@angular/service-worker";

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    MainComponent,
    LoginComponent,
    PasswortVergessenComponent,
    RegistrationComponent,
    PictureUploaderComponent,
    MessageBoxComponent,
    MustMatchDirective,
    ValidateValueDirective
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    FormsModule,
    HttpClientModule,
      ServiceWorkerModule.register('/ngsw-worker.js', {
        enabled: environment.production,
      })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    [PushNotificationService],
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
