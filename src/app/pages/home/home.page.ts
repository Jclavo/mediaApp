import { Component } from '@angular/core';
import { Media, MediaObject } from '@ionic-native/media/ngx';

const file: MediaObject = this.media.create('file.mp3');

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  
  
  constructor(private media: Media)
  {
    
  }

  playAudio()
  {
    // play the file
    file.play();
  }

  stopAudio()
  {
    //
    file.stop();
  }


}
