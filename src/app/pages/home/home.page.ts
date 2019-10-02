import { Component } from '@angular/core';
import { Media, MediaObject } from '@ionic-native/media/ngx';

//const file: MediaObject = this.media.create('https://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_700KB.mp3');

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  public file: MediaObject;
  public slides: any;

  public duration: any;
  
  constructor(private media: Media)
  {
    this.file = this.media.create('https://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_700KB.mp3');
    this.file.onStatusUpdate.subscribe(status => console.log(status));

    
  
    this.slides = [
      {
        id: 1,
        image: '../../assets/images/1.jpg',
        name: 'olá'
      },
      {
        id: 2,
        image: '../../assets/images/2.jpg',
        name: 'Eu'
      },
      {
        id: 3,
        image: '../../assets/images/3.jpg',
        name: 'sou'
      },
      {
        id: 4,
        image: '../../assets/images/4.jpg',
        name: 'um'
      },
      {
        id: 5,
        image: '../../assets/images/5.jpg',
        name: 'slider'
      }
    ]
  }

  ionViewDidEnter()
  {
    this.getDuration();
  }

  playAudio()
  {
    // play the file
    this.file.play();
  }

  stopAudio()
  {
    //
    this.file.stop();
  }

  pauseAudio()
  {
    this.file.pause();
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
    this.duration = this.file.getDuration();
    console.log(this.duration);
  }

  realease()
  {
    this.file.release();
  }


}
