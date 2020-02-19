import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private httpClient: any;
  private yourHeadersConfig: any;

  constructor() { }

  postFile(fileToUpload: File): Observable<boolean> {
    const endpoint = 'your-destination-url';
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return this.httpClient
        .post(endpoint, formData, { headers: this.yourHeadersConfig })
        .map(() => true)
        .catch((e) => this.handleError(e));
  }

  private handleError(e: any) {
    return undefined;
  }
}
