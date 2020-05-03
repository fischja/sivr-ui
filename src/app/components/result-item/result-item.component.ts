import { Component, OnInit, Input } from '@angular/core';
import { Result } from 'src/app/models/Result';
import { ThumbnailService } from 'src/app/services/thumbnail.service';
import { ResultsService } from 'src/app/services/results.service';
import { SubmissionService } from 'src/app/services/submission.service';

@Component({
  selector: 'app-result-item',
  templateUrl: './result-item.component.html',
  styleUrls: ['./result-item.component.css']
})
export class ResultItemComponent implements OnInit {
  private _thumbnail;
  private _result: Result;
  submitted: boolean;

  get thumbnail(): any {
    return this._thumbnail;
  }

  @Input()
  set result(result: Result) {
    this.submitted = (
      result.v3CId in this.resultsService.submittedResults &&
      this.resultsService.submittedResults[result.v3CId].has(result.keyframeNumber))

    this._result = result

    const reader = new FileReader();
    reader.readAsDataURL(result.thumbnail);
    reader.onloadend = () => {
      this._thumbnail = reader.result;
    }
  }

  constructor(private resultsService: ResultsService, private submissionService: SubmissionService) { }

  ngOnInit(): void {
  }

  onSubmitResult() {
    this.submissionService.submit(this._result).subscribe({
      next: (v) => {
        this.submitted = true

        if (!(this._result.v3CId in this.resultsService.submittedResults))
          this.resultsService.submittedResults[this._result.v3CId] = new Set<number>();

        this.resultsService.submittedResults[this._result.v3CId].add(this._result.keyframeNumber)

        console.log(this.resultsService.submittedResults)
      }
    });
  }
}
