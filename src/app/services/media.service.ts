import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

import { GenreModel } from '../models/Genre.model';
import { ToastController } from '@ionic/angular';

//model

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(private httpClient: HttpClient,
    private toastController: ToastController) { }

  private apiRoot: string = 'http://127.0.0.1:8000/api/genres';

  private resultRAW: any;
  private resultObservable: Observable<GenreModel[]>;


  getGenres(): Observable<GenreModel[]> {
    // let apiURL = this.apiRoot + '?term=' + valueSearched + '&media=music&limit=20';
    //let apiURL = 'http://127.0.0.1:8000/api/genres';

    return this.httpClient.get(this.apiRoot).pipe(map(res => {

      this.resultRAW = res;

      console.log('RAW', this.resultRAW)

      this.showToast(this.resultRAW.message);

      return this.resultObservable = this.resultRAW.data.map(item => {

        return new GenreModel(
          item.id,
          item.name
        );
      });

    }));
  }

  createGenre(genre: GenreModel): Observable<void> {
    // return this.httpClient.post(this.apiRoot, genre);
    return this.httpClient.post(this.apiRoot, genre).pipe(map(res => {

      this.resultRAW = res;
      this.showToast(this.resultRAW.message);

    }));
  }

  deleteGenre(id: number): Observable<void> {
    return this.httpClient.delete(this.apiRoot + '/' + id).pipe(map(res => {

      this.resultRAW = res;
      this.showToast(this.resultRAW.message);

    }));
  }

  updateGenre(genre: GenreModel): Observable<void> {
    return this.httpClient.put(this.apiRoot + '/' + genre.id, genre).pipe(map(res => {

      this.resultRAW = res;
      this.showToast(this.resultRAW.message);

    }));
  }


  async showToast(customMessage: string) {
    const toast = await this.toastController.create({
      message: customMessage,
      // position: 'top',
      duration: 2000
    });
    toast.present();
  }




}
