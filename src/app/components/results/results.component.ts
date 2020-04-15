import { Component, OnInit } from '@angular/core';
import { Result } from 'src/app/models/Result';
import { ResultsService } from 'src/app/services/results.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  results: Result[];

  constructor(private resultsService: ResultsService) { }

  ngOnInit(): void {
    this.resultsService.subject.subscribe({
      next: (v) => {
        console.log(v);
        this.results = v;
      }
    });
  }

}
