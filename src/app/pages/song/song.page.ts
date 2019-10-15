import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheetController, Platform } from '@ionic/angular';
// import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { File } from '@ionic-native/file/ngx';
// import { EnvironmentService } from 'src/app/services/environment.service';
//Model
import { SongModel } from 'src/app/models/Song.model';



@Component({
  selector: 'app-song',
  templateUrl: './song.page.html',
  styleUrls: ['./song.page.scss'],
})
export class SongPage implements OnInit {

  @ViewChild('inputcamera', { static: false }) cameraInput: ElementRef;

  public imageURI: any;
  public imageFileName: any;
  public platformsList: any;
  public browser: any;

  private song: SongModel;

  constructor(private camera: Camera,
    private actionSheetController: ActionSheetController,
    // private fileChooser: FileChooser,
    private file: File,
    private platform: Platform,
    // private environmentService: EnvironmentService
  ) { }

  ngOnInit(
  ) {
    // console.log('Platform', this.environmentService.isBrowser());
    //console.log('Platform List', this.platform.platforms());
    this.platformsList = this.platform.platforms().toString();
    // this.browser = this.environmentService.isBrowser();

    this.song = new SongModel(0,'','');

  }

  ionViewDidEnter() {

    const element = this.cameraInput.nativeElement as HTMLInputElement;
    element.onchange = () => {

      // Depois colocar um loading aqui!!!     

      const reader = new FileReader();

      reader.onload = (r: any) => {

        //THIS IS THE ORIGINAL BASE64 STRING AS SNAPPED FROM THE CAMERA
        //THIS IS PROBABLY THE ONE TO UPLOAD BACK TO YOUR DB AS IT'S UNALTERED
        //UP TO YOU, NOT REALLY BOTHERED
        let base64 = r.target.result as string;

        //this.imageFileName = r.target.result as string; //MEU JC
        this.song.image = r.target.result as string; //MEU JC

        //FIXING ORIENTATION USING NPM PLUGIN fix-orientation
        // fixOrientation(base64, { image: true }, (fixed: string, image: any) => {
        //   //fixed IS THE NEW VERSION FOR DISPLAY PURPOSES
        //   this.Foto = fixed;
        //   //this.alertService.hideLoader(500);
        // });

      };

      //console.log('imagem: ', element.files[0]);
      reader.readAsDataURL(element.files[0]);
    };
  }

  async getImage() {

    const actionSheet = await this.actionSheetController.create({
      header: "Select Image source",
      buttons: [{
        text: 'Load from Library',
        handler: () => {

          if (this.platform.is('desktop')) {
            this.loadFromPC();
          }
          else {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }

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
      sourceType: sourceType,
      // sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI,
      //destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    // if(sourceType)
    // {

    // }

    this.camera.getPicture(options).then(imagePath => {
      console.log('Image', imagePath);
      this.imageURI = imagePath;
      this.imageFileName = "data:image/jpeg;base64," + imagePath;
      // this.imageFileName = imagePath;
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

    const element = this.cameraInput.nativeElement as HTMLInputElement;
    element.click();




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

  saveSong(formSong)
  {
    formSong.value.image = this.song.image;

    //We can use this code above
  //   const imgBlob = new Blob([reader.result], {
  //     type: file.type
  // });
  // formData.append('file', imgBlob, file.name);

    console.log('FORM', formSong);
  }

}
