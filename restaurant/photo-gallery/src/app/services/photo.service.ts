import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Photo } from 'src/Model/photo';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  public photos: Photo[] = [];
  constructor(private camera: Camera, private storage: Storage) {
    this. loadSaved();
   }

  takePicture() {
    const options: CameraOptions = {
     quality: 200,
     destinationType: this.camera.DestinationType.DATA_URL,
     encodingType: this.camera.EncodingType.JPEG,
     mediaType: this.camera.MediaType.PICTURE
    };
    
    this.camera.getPicture(options).then((imageData) => {
      // Add new photo to gallery
      this.photos.unshift({
        id :(this.photos.length+1),
        data: 'data:image/jpeg;base64,' + imageData
      });
    
      // Save all photos for later viewing
      this.storage.set('photos', this.photos);
    }, (err) => {
      // Handle error
      console.log("Camera issue: " + err);
    });
    }
    loadSaved() {
      this.storage.get('photos').then((photos) => {
        this.photos = photos || [];
      });
    }

    deletePicture(photoId: number){
      let photoIndex= this.photos.findIndex(p=>p.id==photoId)
      this.photos.splice(photoIndex,1)
      this.storage.set('photos', this.photos);
    }
    
}


