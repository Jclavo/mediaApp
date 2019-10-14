import { Component } from '@angular/core';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';

//service
import { SongService } from '../../services/song.service';

//model
import { SongModel } from '../../models/Song.model';

//const file: MediaObject = this.media.create('https://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_700KB.mp3');

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  public file: MediaObject;
  public slides: any;

  public songs: Array<SongModel>;
  public song: SongService;

  public songDuration: any;
  public songProgress: number = 0;

  public playStatus:  boolean = false;
  public pauseStatus: boolean = false;
  public stopStatus:  boolean = false;
  
  constructor(private media: Media,
              private router: Router,
              private songService: SongService)
  {
    //this.file = this.media.create('https://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_700KB.mp3');
    //this.file.onStatusUpdate.subscribe(status => console.log(status));

    //Set Status
    //this.playStatus = true;

    //setInterval(()=> { this.setRange() }, 1000); // CALL every Second
  
    //this.getDuration();


    // this.slides = [
    //   {
    //     id: 1,
    //     image: '../../assets/images/1.jpg',
    //     name: 'olá'
    //   },
    //   {
    //     id: 2,
    //     image: '../../assets/images/2.jpg',
    //     name: 'Eu'
    //   },
    //   {
    //     id: 3,
    //     image: '../../assets/images/3.jpg',
    //     name: 'sou'
    //   },
    //   {
    //     id: 4,
    //     image: '../../assets/images/4.jpg',
    //     name: 'um'
    //   },
    //   {
    //     id: 5,
    //     image: '../../assets/images/5.jpg',
    //     name: 'slider'
    //   }
    // ]
  }

  ionViewDidEnter()
  {
    this.getSongs();
  }

  playAudio()
  {
    // play the file
    this.file.play();
    //status
    this.playStatus = false;
    this.pauseStatus = true;
    this.stopStatus = true;
  }

  pauseAudio()
  {
    this.file.pause();
    //status
    this.playStatus = true;
    this.pauseStatus = false;
    this.stopStatus = true;
  }

  stopAudio()
  {
    //
    this.file.stop();
    //status
    this.playStatus = true;
    this.pauseStatus = false;
    this.stopStatus = false;
  }

  getPosition()
  {
    // get current playback position
    this.file.getCurrentPosition().then((position) => {
      console.log(position);
    });
  }

  getDuration()
  {
    // get file duration
    this.songDuration = this.file.getDuration();
    console.log(this.songDuration);
    //this.songDuration = 300;
  }

  realease()
  {
    this.file.release();
  }

  setRange()
  {
    if(! this.playStatus && this.pauseStatus === true)
    {
      this.songProgress++;
    }

    if(!this.stopStatus)
    {
      this.songProgress = 0;
    }
    
  }

  openSongPage()
  {
    this.router.navigate(['/song']);
  }

  getSongs()
  {
    this.songService.getSongs().subscribe(
      data => {
        this.songs = data;

        if(this.songs)
        {
          this.setSong(this.songs[0].image);
        }


      },
      error => { console.log('Received an error') }
    );
  }

  setSong(url: string)
  {
    this.file = this.media.create(url);
    //this.file.onStatusUpdate.subscribe(status => console.log(status));

    //Set Status
    this.playStatus = true;

    //setInterval(()=> { this.setRange() }, 1000); // CALL every Second
  
    this.getDuration();
  }

  // ionSlideDidChange()
  // {
    
  // }
  
  


}
