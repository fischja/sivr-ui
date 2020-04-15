import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Result } from '../models/Result';
import { Observable, Subject } from 'rxjs';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ResultsService {
  baseUrl: string = 'https://localhost:44392/api/query';
  subject = new Subject<Result[]>();

  constructor(private http: HttpClient) { }

  getResults(queryText: string){
    this.get(queryText).subscribe(x => {
      this.subject.next(x)
    })
  }

  private get(queryText: string): Observable<Result[]> {
    return this.http.get<any[]>(this.baseUrl, {
      params: {
        text: queryText,
      },
    });
  }
}
