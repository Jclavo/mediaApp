import { Component, OnInit, ViewChild } from '@angular/core';

//service
import { MediaService } from '../../services/media.service';
//model
import { GenreModel } from '../../models/Genre.model';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.page.html',
  styleUrls: ['./genre.page.scss'],
})
export class GenrePage implements OnInit {

  @ViewChild('inputName', { static: false }) inputName: IonInput;

  private genres: Array<GenreModel>;
  private genre: GenreModel;

  constructor(private mediaService: MediaService) {
    this.genre = new GenreModel(0, null);
  }

  ngOnInit() {

    this.getGenres();
  }

  getGenres() {
    this.mediaService.getGenres().subscribe(
      data => {
        this.genres = data;
      },
      error => { console.log('Received an error') }
    );

  }

  saveGenre() {
    if (this.genre.id) {
      this.updateGenre();
    }
    else {
      this.createGenre();
    }
  }



  createGenre() {
    // console.log('add',this.genre.name);

    this.mediaService.createGenre(this.genre).subscribe(data => {
      this.getGenres();
      this.genre.clear();
    },
      error => { console.log('Received an error') }
    );


  }

  deleteGenre(id: number) {

    this.mediaService.deleteGenre(id).subscribe(data => {
      this.getGenres();
    },
      error => { console.log('Received an error') }
    );;

  }

  updateGenre() {
    // console.log('Updating....')

    this.mediaService.updateGenre(this.genre).subscribe(data => {
      this.genre.clear();
      this.getGenres();
    },
      error => { console.log('Received an error') }
    );;

  }

  prepareUpdateGenre(id: number) {
    // this.genre = this.genres.filter(function (value, index, array) {
    //   return <GenreModel> value[index].id != id;
    // });

    this.genre.clear();

    this.genre = this.findGenre(id);

    if (this.genre) {
      this.inputName.setFocus();
    }

  }

  findGenre(id: number): GenreModel {
    let genreIndex = this.genres.findIndex(genre => genre.id === id);

    if (genreIndex === -1) {
      console.log('Tipo Boletim não existe');
      return null;
    }
    else {
      return this.genres[genreIndex];
    }
  }

}
