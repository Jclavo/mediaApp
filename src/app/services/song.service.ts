import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
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

  createSong(song: any): Observable<void> {
    // return this.httpClient.post(this.apiRoot, genre);

    let headers = new HttpHeaders();
    let params = new HttpParams();
    /** In Angular 5, including the header Content-Type can invalidate your request */
    // headers.append('Content-Type', 'multipart/form-data');
    // //headers.append('Accept', 'application/json');
    // //let options = new RequestOptions({ headers: headers });
    // const options = {
    //   headers: headers,
    //   params: params,
    //   reportProgress: true,
    //   withCredentials: true,
    // }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'multipart/form-data',
        'Accept':        'application/json'
        // 'Authorization': 'my-auth-token'
      })
    };


    return this.httpClient.post(this.apiRoot, song).pipe(map(res => {

      this.resultRAW = res;
      // this.showToast(this.resultRAW.message);
      console.log(this.resultRAW.message);

    }));
  }

}
