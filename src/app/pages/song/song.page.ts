import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheetController } from '@ionic/angular';
// import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-song',
  templateUrl: './song.page.html',
  styleUrls: ['./song.page.scss'],
})
export class SongPage implements OnInit {

  public imageURI: any;
  public imageFileName: any;

  constructor(private camera: Camera,
    private actionSheetController: ActionSheetController,
    // private fileChooser: FileChooser,
    private file: File
  ) { }

  ngOnInit() {
  }

  async getImage() {

    const actionSheet = await this.actionSheetController.create({
      header: "Select Image source",
      buttons: [{
        text: 'Load from Library',
        handler: () => {
          this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          //this.loadFromPC();

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
     // destinationType: this.camera.DestinationType.FILE_URI,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    this.camera.getPicture(options).then(imagePath => {
      console.log('Image', imagePath);
      this.imageURI = imagePath;
      this.imageFileName = "data:image/jpeg;base64," + imagePath;
      console.log('Path', this.file.dataDirectory)

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

  loadFromPC() {
    // this.fileChooser.open()
    //   .then(uri => console.log(uri))
    //   .catch(e => console.log(e));
    // const reader = new FileReader();

    // reader.onload = (r: any) => {

    //   //THIS IS THE ORIGINAL BASE64 STRING AS SNAPPED FROM THE CAMERA
    //   //THIS IS PROBABLY THE ONE TO UPLOAD BACK TO YOUR DB AS IT'S UNALTERED
    //   //UP TO YOU, NOT REALLY BOTHERED
    //   let base64 = r.target.result as string;

    //   //FIXING ORIENTATION USING NPM PLUGIN fix-orientation
    //   // fixOrientation(base64, { image: true }, (fixed: string, image: any) => {
    //   //   //fixed IS THE NEW VERSION FOR DISPLAY PURPOSES
    //   //   this.Foto = fixed;
    //   //   //this.alertService.hideLoader(500);
    //   // });
    // }
  }

}
