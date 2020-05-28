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
    let url = "https://interactivevideoretrieval.com/submit/";
    console.log(result.v3CId.toString().padStart(5, "0"));
    console.log(result.keyframeNumber.toString());
    
    return this.http.get(url, {
      params: {
        item: result.v3CId.toString().padStart(5, "0"),
        shot: result.keyframeNumber.toString(),
        session: "node01lwbiaiv2hrw78o08mi83k3h39",
      },
    });
  }
}
