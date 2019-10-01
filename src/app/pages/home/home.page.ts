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
  
  constructor(private media: Media)
  {
    this.file = this.media.create('https://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_700KB.mp3');
    this.file.onStatusUpdate.subscribe(status => console.log(status));
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
    let duration = this.file.getDuration();
    console.log(duration);
  }

  realease()
  {
    this.file.release();
  }


}
