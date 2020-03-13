import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Ng5SliderModule } from 'ng5-slider';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { AppRoutingModule } from './app-routing.module';
import { ProfileComponent} from './profile/profile.component';

import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { PictureUploaderComponent } from './picture-uploader/picture-uploader.component';
import { DogIndexCardComponent } from './dog-index-card/dog-index-card.component';
import { MessageBoxComponent } from './message-box/message-box.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PasswortVergessenComponent} from './passwort-vergessen/passwort-vergessen.component';
import { MustMatchDirective } from './must-match.directive';
import {AddDogFormComponent} from './add-dog-form/add-dog-form.component';
import { ValidateValueDirective } from './validate-value.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';
import { UploadProfilePictureComponent } from './upload-profile-picture/upload-profile-picture.component';
import { PushNotificationService} from './services/push-notification.service';
import { environment} from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import {ServiceWorkerModule, SwRegistrationOptions} from '@angular/service-worker';

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
    DogIndexCardComponent,
    AddDogFormComponent,
    MustMatchDirective,
    MessageBoxComponent,
    ValidateValueDirective,
    UploadProfilePictureComponent
  ],
  entryComponents: [
      ModalComponent,
    UploadProfilePictureComponent
  ],
    imports: [
      BrowserModule,
      RouterModule,
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
