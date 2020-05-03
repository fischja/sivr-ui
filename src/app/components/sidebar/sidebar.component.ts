import { Component, OnInit, QueryList, ViewChildren, ViewChild, Query } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { QueryService } from 'src/app/services/query.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ConceptService } from 'src/app/services/concept.service';
import { MatButtonToggleGroup, MatButtonToggle } from '@angular/material/button-toggle';
import { CountdownComponent } from 'ngx-countdown';
import { SubmissionService } from 'src/app/services/submission.service';

export class Tile {
  selected: boolean;
  color: string;
  constructor(color: string) {
    this.color = color;
  }
}

export class QueryMode {
  text: string;
  value: number;
  constructor(text: string, value: number) {
    this.text = text;
    this.value = value;
  }
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  myForm: FormGroup;

  minutes = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10
  ];

  teams = [
    1, 2, 3, 4, 5, 6
  ];

  members = [
    1, 2
  ];

  selectedTeam: number = this.teams[0]
  selectedMember: number = this.members[0]

  colors = [
    "#000000",
    "#8b4513",
    "#006400",
    "#778899",
    "#000080",
    "#ff0000",
    "#ffa500",
    "#ffff00",
    "#c71585",
    "#00ff00",
    "#00fa9a",
    "#00ffff",
    "#0000ff",
    "#ff00ff",
    "#1e90ff",
    "#eee8aa",
  ]

  queryModes: QueryMode[] = [
    new QueryMode("Concept", 0),
    new QueryMode("Both", 1),
    new QueryMode("Color", 2),
  ]

  tiles: Tile[] = this.colors.map(x => new Tile(x));

  selectedTile: Tile;
  selectedConcept: string;
  selectedQueryMode: QueryMode;
  currentConceptWeight: number;

  leftTime: number = this.minutes[0] * 60;

  myControl = new FormControl();
  options: string[];
  filteredOptions: Observable<string[]>;

  @ViewChild('cd', { static: false }) private countdown: CountdownComponent;
  countdownHidden: boolean = true;
  timeInputHidden: boolean = false;

  constructor(
    private queryService: QueryService,
    private conceptService: ConceptService,
    private submissionService: SubmissionService
  ) {
    this.tiles[0].selected = true;
    this.selectedTile = this.tiles[0];
    this.selectedQueryMode = this.queryModes[0];
    this.currentConceptWeight = 0.0;
  }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      'query': new FormControl(null, Validators.minLength(1))
    });

    this.conceptService.conceptSubject.subscribe(x => {
      this.options = Object.keys(x).sort();
      this.filteredOptions = this.myControl.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value))
        );
    });

    this.conceptService.fill();
  }

  onPauseClick() {
    this.countdown.pause();
  }

  onRestartClick() {
    this.countdown.restart();
    this.countdownHidden = true;
    this.timeInputHidden = false;
  }

  onResumeClick() {
    this.countdown.resume();
    this.countdownHidden = false;
    this.timeInputHidden = true;
  }

  foo(tile: Tile) {
    this.tiles.forEach(t => t.selected = false);
    tile.selected = true
    this.selectedTile = tile;
  }

  onQueryModeChange(queryMode: QueryMode) {
    this.selectedQueryMode = queryMode;
  }

  onSubmitConcept(concept) {
    this.selectedConcept = concept;
  }

  onSubmit() {
    console.log(this.selectedQueryMode)

    let conceptId = this.conceptService.concepts[this.selectedConcept]
    this.queryService.sendConceptQuery(conceptId, this.selectedTile.color, this.selectedQueryMode.value);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  onMinuteChange(minute) {
    this.leftTime = minute * 60;
  }

  onServerNameChange(serverName: string) {
    this.submissionService.serverName = serverName;
  }

  onTeamChange(team: number) {
    this.submissionService.team = team;
  }

  onMemberChange(member: number) {
    this.submissionService.member = member;
  }
}
