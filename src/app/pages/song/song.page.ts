import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-song',
  templateUrl: './song.page.html',
  styleUrls: ['./song.page.scss'],
})
export class SongPage implements OnInit {

  constructor(private camera: Camera,
    private actionSheetController: ActionSheetController) { }

  ngOnInit() {
  }

  async getImage() {

    const actionSheet = await this.actionSheetController.create({
      header: "Select Image source",
      buttons: [{
        text: 'Load from Library',
        handler: () => {
          this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: 'Use Camera',
        handler: () => {
          this.takePicture(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();

  }

  takePicture(sourceType: any) {
    var options: CameraOptions = {
        quality: 100,
        // sourceType: sourceType,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        saveToPhotoAlbum: false,
        correctOrientation: true
    };
 
    this.camera.getPicture(options).then(imagePath => {
      console.log('Image',imagePath)
        // if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        //     this.filePath.resolveNativePath(imagePath)
        //         .then(filePath => {
        //             let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
        //             let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
        //             this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
        //         });
        // } else {
        //     var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        //     var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        //     this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
        // }
    });
 
}

}
