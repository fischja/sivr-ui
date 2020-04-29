import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConceptService {
  baseUrl: string = 'https://localhost:44392/api/concept';

  concepts: Map<string, number>;
  conceptSubject: Subject<Map<string, number>> = new Subject<Map<string, number>>();

  constructor(private http: HttpClient) {
    this.conceptSubject.subscribe({
      next: v => this.concepts = v,
    })
  }

  fill() {
    this.http.get<Map<string, number>>(this.baseUrl).subscribe(v => {
      this.conceptSubject.next(v);
    });
  }
}
