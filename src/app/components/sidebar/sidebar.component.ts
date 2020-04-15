import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ResultsService } from 'src/app/services/results.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  myForm: FormGroup;

  constructor(private resultsService: ResultsService) { }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      'query': new FormControl(null, Validators.minLength(1))
    });
  }

  onSubmit() {
    let queryString = this.myForm.value["query"];
    console.log(queryString);
    this.resultsService.getResults(queryString);
  }

}
