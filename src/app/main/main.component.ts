import { Component, OnInit } from '@angular/core';
import { DataStoreService } from '../services/data-store.service';
import {TrackingService} from '../services/tracking.service';
import config from '../services/environment.json';
import {RegisterResponse} from '../registration/registration.interfaces';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {

  public response: (null | RegisterResponse);
  private isVisible: boolean;
  private submenu: boolean;
  public response: ( null | RegisterResponse );

  constructor(private dataStore: DataStoreService, private tracking: TrackingService) {
    this.isVisible = false;
  }

  ngOnInit() {}

  async onChange() {
    this.isVisible = !this.isVisible;
    if(this.isVisible){
      this.tracking.activateServerTracking();
    }
    else{
      this.tracking.deActivateServerTracking();
    }
  }

  async onLogout() {
    const authId = this.dataStore.authToken.id;

    try {
      const response = await fetch(config.serverBaseUrl + 'logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ authId })
      })

      const responseData: RegisterResponse = await response.json();

      this.handleResponse(responseData);
    } catch(e) {
      this.handleResponse({ success: false, message: 'The server did not respond' })
    }
  }

  handleResponse(response: RegisterResponse) {
    this.response = response;
    console.log((response));
    if (response.success) {
      this.dataStore.logout();

    }
  }
  onClick() {
      this.submenu = true;
  }
}
