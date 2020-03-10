import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouteReuseStrategy, RouterModule } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Ng5SliderModule } from 'ng5-slider';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { AppRoutingModule } from './app-routing.module';
import { ProfileComponent} from './profile/profile.component';
import { ListComponent } from './list/list.component';

import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { PictureUploaderComponent } from './picture-uploader/picture-uploader.component';
import { MessageBoxComponent } from './message-box/message-box.component';
import { FriendListComponent } from './list/friend-list/friend-list.component';
import { DogListComponent } from './list/dog-list/dog-list.component';
import { RoutesListComponent } from './list/routes-list/routes-list.component';
import { BlockedListComponent } from './list/blocked-list/blocked-list.component';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { FormsModule } from '@angular/forms';
import { PasswortVergessenComponent } from './passwort-vergessen/passwort-vergessen.component';
import { MustMatchDirective } from './must-match.directive';
import { ValidateValueDirective } from './validate-value.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';
import { UploadProfilePictureComponent } from './upload-profile-picture/upload-profile-picture.component';
import { PushNotificationService} from "./services/push-notification.service";
import { environment} from "../environments/environment";
import { HttpClientModule } from '@angular/common/http'
import {ServiceWorkerModule, SwRegistrationOptions} from "@angular/service-worker";

import { DataStoreService } from './services/data-store.service';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    MainComponent,
    LoginComponent,
    PasswortVergessenComponent,
    ProfileComponent,
    ModalComponent,
    RegistrationComponent,
    PictureUploaderComponent,
    MessageBoxComponent,
    MustMatchDirective,
    ValidateValueDirective,
    UploadProfilePictureComponent,
    FriendListComponent,
    DogListComponent,
    RoutesListComponent,
    BlockedListComponent,
    ListComponent
  ],
  entryComponents: [
    ModalComponent,
    UploadProfilePictureComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    CommonModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    Ng5SliderModule,
    HttpClientModule,
      ServiceWorkerModule.register('/ngsw-worker.js')
  ],
  providers: [
    StatusBar,
    SplashScreen,
    [PushNotificationService],
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: SwRegistrationOptions,
      useFactory: () => ({enabled: environment.production}),
    },
    DataStoreService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
