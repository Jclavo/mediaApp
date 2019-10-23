import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

import { SongModel } from '../models/Song.model';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  private apiRoot: string = 'http://127.0.0.1:8000/api/songs';
  
  private resultRAW: any;
  private resultObservable: Observable<SongModel[]>;

  constructor(private httpClient: HttpClient) { }

  getSongs(): Observable<SongModel[]> {
    // let apiURL = this.apiRoot + '?term=' + valueSearched + '&media=music&limit=20';
    //let apiURL = 'http://127.0.0.1:8000/api/genres';

    return this.httpClient.get(this.apiRoot).pipe(map(res => {

      this.resultRAW = res;

      console.log('RAW', this.resultRAW)

      //this.showToast(this.resultRAW.message);

      return this.resultObservable = this.resultRAW.data.map(item => {

        return new SongModel(
          item.id,
          item.name,
          item.path,
          item.path
        );
      });

    }));
  }

}
