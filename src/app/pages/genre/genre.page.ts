import { Component, OnInit } from '@angular/core';

//service
import { MediaService } from '../../services/media.service';
//model
import { GenreModel } from '../../models/Genre.model';



@Component({
  selector: 'app-genre',
  templateUrl: './genre.page.html',
  styleUrls: ['./genre.page.scss'],
})
export class GenrePage implements OnInit {

  private genres: Array<GenreModel>;
  private genre: GenreModel;

  constructor(private mediaService: MediaService) {
    this.genre = new GenreModel(0, '');
  }

  ngOnInit() {

    this.getGenres();
  }

  getGenres() {
    this.mediaService.getGenres().subscribe(data => {
      this.genres = data;
    });

  }

  createGenre() {
    // console.log('add',this.genre.name);

    this.mediaService.createGenre(this.genre).subscribe(data => {
      this.getGenres();
    });


  }

  deleteGenre(id: number) {
    this.genre.id = id;

    this.mediaService.deleteGenre(this.genre.id).subscribe(data => {
      this.getGenres();
    });;


  }

}
