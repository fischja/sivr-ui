import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { Result } from 'src/app/models/Result';
import { ResultsService } from 'src/app/services/results.service';
import { OverlayConfig, Overlay, CdkOverlayOrigin, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';



@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  results: Result[];

  tempResults: number[] = Array.from(Array(50).keys());

  overlayRef: OverlayRef;
	@ViewChild(CdkOverlayOrigin) _overlayOrigin: CdkOverlayOrigin;

  constructor(public overlay: Overlay, public viewContainerRef: ViewContainerRef, private resultsService: ResultsService) { }

  ngOnInit(): void {
    this.resultsService.subject.subscribe({
      next: (v) => {
        this.results = v;
      }
    });
  }
}
