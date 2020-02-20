import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {DataStoreService} from './data-store.service';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private httpClient: any;

  constructor(private dataStore: DataStoreService) { }

  postFile(fileToUpload: File): Observable<boolean> {
    const endpoint = 'http://localhost:3000/profile/updateProfilePic';
    const formData: FormData = new FormData();
    formData.append('userData', this.dataStore.userData);
    formData.append('authId', this.dataStore.authToken);
    formData.append('profilePicFile', fileToUpload, fileToUpload.name);
    return this.httpClient
        .post(endpoint, formData, { 'Content-Type': 'multipart/form-data' })
        .map(() => true)
        .catch((e) => this.handleError(e));
  }

  private handleError(e: any) {
    return undefined;
  }
}
