import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { QueryService } from 'src/app/services/query.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ConceptService } from 'src/app/services/concept.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  myForm: FormGroup;

  myControl = new FormControl();
  options: string[];
  filteredOptions: Observable<string[]>;

  constructor(private queryService: QueryService, private conceptService: ConceptService) { }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      'query': new FormControl(null, Validators.minLength(1))
    });

    this.conceptService.conceptSubject.subscribe(x => {
      this.options = Object.keys(x);
      this.filteredOptions = this.myControl.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value))
        );
    });

    this.conceptService.fill();
  }

  onSubmitConcept(concept) {
    let conceptId = this.conceptService.concepts[concept] 
    this.queryService.sendConceptQuery(conceptId);
  }

  onSubmit() {
    let queryString = this.myForm.value["query"];
    console.log(queryString);
    this.queryService.sendTextQuery(queryString);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
