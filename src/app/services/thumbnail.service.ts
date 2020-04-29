import { Injectable, Sanitizer } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ThumbnailService {
  baseUrl: string = 'https://localhost:44392/api/thumbnail';

  constructor(private http: HttpClient) { }

  get(v3cId: number, frame: number): Observable<Blob> {
    const options: Object = {
      responseType: 'blob',
      params: {
        v3cid: v3cId.toString(),
        frame: frame.toString()
      },
    };

    return this.http.get<Blob>(this.baseUrl, options);
  }

  createImageFromBlob(blob: Blob) {
    let reader = new FileReader();

    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      return reader.result;
    }
  }
}
