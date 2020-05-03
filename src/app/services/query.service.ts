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

  sendConceptQuery(conceptId: number, colorId: string, queryMode: number) {
    this.getConceptResult(conceptId, colorId, queryMode).subscribe(x => {
      let obs: Observable<Blob>[] = new Array<Observable<Blob>>();
      x.forEach(v => {
        obs.push(this.thumbnailService.get(v.v3CId, v.keyframeNumber).pipe(
          catchError(val => of(null)),
          tap(img => { v.thumbnail = img; })
        ));
      });

      zip(...obs).subscribe(arr => {
        console.log("done")

        const y = [];
        x.forEach(val => {
          if (val.thumbnail != null) {
            y.push(val);
          }
        });

        this.resultsService.subject.next(y);
      });
    });
  }

  private getConceptResult(conceptId: number, colorId: string, queryMode: number): Observable<Result[]> {
    return this.http.get<Result[]>(this.conceptQueryUrl, {
      params: {
        conceptId: conceptId.toString(),
        colorId: colorId,
        queryMode: queryMode.toString(),
      },
    });
  }
}
