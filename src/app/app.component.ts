import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SwPush } from '@angular/service-worker';
import { PushNotificationService} from "./services/push-notification.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    swPush: SwPush,
    pushService: PushNotificationService
  ) {
    const VAPID_PUBLIC = 'BLh_eSBke1-kJSm8d21jlj88Zz6_iwPW69pbUzQ1IWMrz7-ZDzC8hUpmyjxm4vI1a7xeX2ETZ0tw2eoCsm358XA';

    this.initializeApp();
    if(swPush.isEnabled) {
      swPush.requestSubscription({
        serverPublicKey: VAPID_PUBLIC
      })
          .then(subscription => {
            pushService.sendSubscriptionToTheServer(subscription).subscribe()
          })
          .catch(console.error);
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
