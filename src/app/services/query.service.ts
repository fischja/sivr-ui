import { Injectable } from '@angular/core';
import { Subject, Observable, zip, from, of } from 'rxjs';
import { Result } from '../models/Result';
import { HttpClient } from '@angular/common/http';
import { ThumbnailService } from './thumbnail.service';
import { ResultsService } from './results.service';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QueryService {
  baseUrl: string = 'https://localhost:44392/api/query';
  conceptQueryUrl: string = 'https://localhost:44392/api/conceptquery';

  constructor(
    private http: HttpClient,
    private thumbnailService: ThumbnailService,
    private resultsService: ResultsService,
  ) { }

  sendConceptQuery(conceptId: number) {
    this.getConceptResult(conceptId).subscribe(x => {
      console.log(x);
      let obs: Observable<Blob>[] = new Array<Observable<Blob>>();
      x.forEach(v => {
        obs.push(this.thumbnailService.get(v.v3CId, v.keyframeNumber).pipe(
          catchError(val => of(null)),
          tap(img => console.log("heyyyyyy")),
          tap(img => { v.thumbnail = img; })
        ));
      });

      zip(...obs).subscribe(arr => {
        console.log("done")

        const y = [];
        x.forEach(val => {
          console.log(val.thumbnail)
          if (val.thumbnail != null) {
            y.push(val);
          }
        });

        this.resultsService.subject.next(y);
      });
    });
  }

  sendTextQuery(queryText: string) {
    this.get(queryText).subscribe(x => {
      // this.resultsService.subject.next(x);
      let obs: Observable<Blob>[] = new Array<Observable<Blob>>();
      x.forEach(v => {
        obs.push(this.thumbnailService.get(v.v3CId, v.keyframeNumber).pipe(
          catchError(val => of(null)),
          tap(img => console.log("heyyyyyy")),
          tap(img => { v.thumbnail = img; })
        ));
      });

      zip(...obs).subscribe(arr => {
        console.log("done")

        const y = [];
        x.forEach(val => {
          console.log(val.thumbnail)
          if (val.thumbnail != null) {
            y.push(val);
          }
        });

        this.resultsService.subject.next(y);
      });
    });
  }

  private getConceptResult(conceptId: number): Observable<Result[]> {
    // return from([[new Result(37, 10), new Result(37, 25)]]);
    return this.http.get<Result[]>(this.conceptQueryUrl, {
      params: {
        id: conceptId.toString(),
      },
    });
  }

  private get(queryText: string): Observable<Result[]> {
    return from([[new Result(37, 10), new Result(37, 25)]]);
    return this.http.get<any[]>(this.baseUrl, {
      params: {
        text: queryText,
      },
    });
  }
}
