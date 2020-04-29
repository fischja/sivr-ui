import { Component, OnInit, Input } from '@angular/core';
import { Result } from 'src/app/models/Result';
import { ThumbnailService } from 'src/app/services/thumbnail.service';

@Component({
  selector: 'app-result-item',
  templateUrl: './result-item.component.html',
  styleUrls: ['./result-item.component.css']
})
export class ResultItemComponent implements OnInit {
  private _thumbnail; 

  get thumbnail(): any { 
    return this._thumbnail;
  }
  
  @Input()
  set blob(val: Blob) {
    const reader = new FileReader();
    reader.readAsDataURL(val); 
    reader.onloadend = () => {
      this._thumbnail = reader.result;     
    }
  }

  constructor(private thumbnailService: ThumbnailService) { }

  ngOnInit(): void {
  }
}
