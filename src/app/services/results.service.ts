import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Result } from '../models/Result';
import { Observable, Subject } from 'rxjs';
import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class ResultsService {
  submittedResults = new Map<number, Set<number>>();
  subject = new Subject<Result[]>();

  constructor(private http: HttpClient) { }
}
