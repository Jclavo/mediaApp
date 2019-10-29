import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheetController, Platform } from '@ionic/angular';
// import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { File } from '@ionic-native/file/ngx';
// import { EnvironmentService } from 'src/app/services/environment.service';
//Model
import { SongModel } from 'src/app/models/Song.model';

//service
import { SongService } from '../../services/song.service';
import { Form } from '@angular/forms';



@Component({
  selector: 'app-song',
  templateUrl: './song.page.html',
  styleUrls: ['./song.page.scss'],
})
export class SongPage implements OnInit {

  @ViewChild('inputImage', { static: false }) inputImage: ElementRef;
  @ViewChild('inputMP3', { static: false }) inputMP3: ElementRef;

  public imageURI: string;
  public mp3URI: any;

  public imageFileName: any;


  public platformsList: any;
  public browser: any;

  private song: SongModel;

  constructor(private camera: Camera,
    private actionSheetController: ActionSheetController,
    private file: File,
    private platform: Platform,
    private songService: SongService,
  ) { }

  ngOnInit(
  ) {

    this.platformsList = this.platform.platforms().toString();

    this.song = new SongModel(0, null, null, null);

  }

  ionViewDidEnter() {

    const elementImage = this.inputImage.nativeElement as HTMLInputElement;
    elementImage.onchange = () => {

      // Depois colocar um loading aqui!!!     
      const reader = new FileReader();

      reader.onload = (r: any) => {

        let base64 = r.target.result as string;

        //this.imageFileName = r.target.result as string; //MEU JC
        this.imageURI = r.target.result as string; //MEU JC
      };

      //console.log('imagem: ', element.files[0]);
      reader.readAsDataURL(elementImage.files[0]);
    };

    const elementMP3 = this.inputMP3.nativeElement as HTMLInputElement;
    elementMP3.onchange = () => {

      // Depois colocar um loading aqui!!!     
      const reader = new FileReader();

      reader.onload = (r: any) => {

        //console.log('super raw',r);

        let base64 = r.target.result as string;

        //console.log('test: ', reader.result);


        // var file = new File();

        // file.createFile(r.target, "name",true);

        // console.log('file',file);

        //this.song.path = this.mp3URI;
      };

      //console.log('imagem: ', element.files[0]);
      reader.readAsDataURL(elementMP3.files[0]);

      this.song.song = elementMP3.files[0];
      this.imageFileName = elementMP3.files[0].name;
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

    const elementImage = this.inputImage.nativeElement as HTMLInputElement;
    elementImage.click();

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

  getFile(fileType: string) {
    switch (fileType) {
      case 'MP3':
        // code block
        const elementMP3 = this.inputMP3.nativeElement as HTMLInputElement;
        elementMP3.click();
        break;

      case 'JPG':
        // code block
        const elementImage = this.inputImage.nativeElement as HTMLInputElement;
        elementImage.click();
        break;
      default:
      // code block
    }
  }


  saveSong(formSong: any) {

    this.song.title = formSong.value.title;
   
    const formData = new FormData();

    formData.append('title', this.song.title);
    formData.append('song', this.song.song, this.song.song.name);

    console.log('FORM', formData);

    this.createSong(formData);

  }

  createSong(formData) {
    


    // https://stackoverflow.com/questions/41697980/laravel-request-hasfile-is-not-working
    // https://www.techiediaries.com/angular-formdata/



    this.songService.createSong(formData).subscribe(data => {
      console.log(data);
    },
      error => { console.log('Received an error') }
    );


  }

}
