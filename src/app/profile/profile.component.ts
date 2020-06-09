import { Component, OnInit } from '@angular/core';
import { DataStoreService } from '../services/data-store.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { UploadProfilePictureComponent } from '../upload-profile-picture/upload-profile-picture.component';
import config from '../services/environment.json';
import {RegisterResponse} from '../registration/registration.interfaces';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

    public response: (null | RegisterResponse);

  constructor(private dataStore: DataStoreService, public matDialog: MatDialog) {
  }

  ngOnInit() {
  }

   openModal(target: string) {
      const dialogConfig = new MatDialogConfig();
      // The user can't close the dialog by clicking outside its body
      dialogConfig.disableClose = false;
      dialogConfig.id = 'modal-component'; // css in global.scss
      dialogConfig.height = '350px';
      dialogConfig.width = '600px';
       // https://material.angular.io/components/dialog/overview
      if (target === 'palette') {
           const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);
          // tslint:disable-next-line:align
      } else if (target === 'upload') {
           const modalDialog = this.matDialog.open(UploadProfilePictureComponent, dialogConfig);
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
            });

            const responseData: RegisterResponse = await response.json();

            this.handleResponse(responseData);
        } catch (e) {
            this.handleResponse({ success: false, message: 'The server did not respond' });
        }
    }

    handleResponse(response: RegisterResponse) {
        this.response = response;
        console.log((response));
        if (response.success) {
            this.dataStore.logout();

        }
    }


}
