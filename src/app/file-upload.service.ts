import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {DataStoreService} from './data-store.service';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private httpClient: any;
  private yourHeadersConfig: any;

  constructor(private dataStore: DataStoreService) { }

  postFile(fileToUpload: File): Observable<boolean> {
    const endpoint = 'http://localhost:3000/profile/updateProfilePic';
    const formData: FormData = new FormData();
    formData.append('username', this.dataStore.userData.username, this.dataStore.userData.username);
    formData.append('email', this.dataStore.userData.email, this.dataStore.userData.email);
    formData.append('password', this.dataStore.userData.password, this.dataStore.userData.password);
    formData.append('authId', this.dataStore.userData.auth, this.dataStore.userData.auth);
    formData.append('profilePic', fileToUpload, fileToUpload.name);
    return this.httpClient
        .post(endpoint, formData, { headers: this.yourHeadersConfig })
        .map(() => true)
        .catch((e) => this.handleError(e));
  }

  private handleError(e: any) {
    return undefined;
  }
}
