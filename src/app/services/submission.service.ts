import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Result } from '../models/Result';

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {
  serverName: string;
  team: number;
  member: number;

  constructor(private http: HttpClient) { }

  submit(result: Result) {
    let url = "http://" + this.serverName + "/vbs/submit";
    console.log(url)
    
    return this.http.post(url, {
      params: {
        team: this.team.toString(),
        member: this.member.toString(),
        video: result.v3CId.toString(),
        frame: result.keyframeNumber.toString(),
      },
    });
  }

}
