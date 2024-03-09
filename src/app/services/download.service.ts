import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor(private http: HttpClient) { }

  downloadAsset(fileName: string): void {
    this.http.get(`assets/pdf/${fileName}`, { responseType: 'blob' }).subscribe(response => {
      const blob = new Blob([response], { type: 'application/octet-stream' });
      saveAs(blob, fileName);
    }, error => {
      console.error('Error downloading asset:', error);
    });
  }
}


