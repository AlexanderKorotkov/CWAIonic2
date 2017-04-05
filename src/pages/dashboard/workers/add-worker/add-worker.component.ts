import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { AuthService } from '../../../../shared/auth/auth.service';
import {NotificationsService} from 'angular2-notifications';

import { AddEditFields } from '../shared/add-edit-fields';

import { AddWorkerService } from './add-worker.service';
import { UploadAvatarService } from '../shared/upload-avatar.service';
import { ImgService } from '../../../../shared/img-service/img.service';
import { LoadingController } from 'ionic-angular';

@Component({
    selector: 'add-worker',
    templateUrl: '../shared/add-edit-worker.component.html'
})
export class AddWorkerComponent{
  uploader: any;
  uploadService : any;
  currentUser : any;

  imgService: any;
  loadingGif : any;
  workerInfo: AddEditFields;
  constructor(
        private addWorkerService: AddWorkerService,
        private authService: AuthService,
        private uploadAvatarService: UploadAvatarService,
        private notificationsService: NotificationsService,
        private nav: NavController,
        private navParams: NavParams,
        private img: ImgService,
        private loading: LoadingController,
        private photoLibrary: PhotoLibrary
    ) {
      this.uploadAvatarService.url = this.navParams.get('url');
    }


  ionViewDidEnter() {

      this.currentUser = this.authService.getUserIdentity().user;

      this.imgService = this.img;

      this.uploadService = this.uploadAvatarService;
      this.uploader = this.uploadService.initUploader();
      this.uploader.options.url = this.uploadAvatarService.setUploaderUrl('addWorker');

      this.uploader.onAfterAddingFile = ((item:any) => {
          this.uploadAvatarService.onAfterAddingFile(item);
      });

    this.workerInfo = {
      name: '',
      surname: '',
      email: '',
      position: '',
      project: '',
      skype: '',
      phone: '',
      bDay: '',
      avatar:{}
    };


    this.photoLibrary.requestAuthorization().then(() => {
      this.photoLibrary.getLibrary().subscribe({
        complete: () => { console.log("could not get photos"); }
      });
    }).catch(err => console.log("permissions weren't granted"));
    }

    onFileChange(event:any) {
      var output = <HTMLImageElement>document.querySelector(".worker-img");
      output.src = URL.createObjectURL(event.target.files[0]);
      this.uploadAvatarService.target = event.target || event.srcElement;
    }

    sendUser(form:any){
      if(form.invalid){
        this.notificationsService.error(
            'Error',
            'Please fill all required fields'
        );
        return false;
      }
      this.loadingGif = this.loading.create();
      this.loadingGif.present();
        if(this.uploader.queue[0]){
          this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
              this.uploadAvatarService.onBuildItemForm(fileItem, form, this.workerInfo, this.currentUser.currentCompany);
          };

          this.uploadAvatarService.uploadFile(this.uploader.queue[0]);
          this.uploader.onCompleteItem = (item:any, response:any, status:any) => {
            this.loadingGif.dismiss();
            this.uploadAvatarService.onCompleteItem(item, response, status);
          };
        }else{
          this.addWorkerService.addWorker(this.workerInfo, this.currentUser.currentCompany).subscribe(() => {
            this.loadingGif.dismiss();
            this.notificationsService.success(
                'Success',
                `Worker was created`
            );
            this.nav.pop();
          },(result) => {
            this.loadingGif.dismiss();
            this.notificationsService.error(
                'Error',
                `${result.error}`
            )
          }) ;
        }

    }

}
