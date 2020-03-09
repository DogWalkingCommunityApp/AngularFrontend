import { Component, OnInit } from '@angular/core';
import { DataStoreService } from '../services/data-store.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { UploadProfilePictureComponent } from '../upload-profile-picture/upload-profile-picture.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

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

    logout() {
        // logout user
    }
}
