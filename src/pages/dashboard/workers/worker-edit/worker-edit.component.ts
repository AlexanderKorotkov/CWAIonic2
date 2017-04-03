import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {NotificationsService} from 'angular2-notifications';
import { PhotoLibrary } from '@ionic-native/photo-library';

import { AuthService } from '../../../../shared/auth/auth.service';
import { WorkerEditService } from './worker-edit.service';
import { WorkersService } from '../workers.service';
import { UploadAvatarService } from '../shared/upload-avatar.service';
import { ImgService } from '../../../../shared/img-service/img.service';
import { LoadingController } from 'ionic-angular';

@Component({
    selector: 'worker-edit',
    templateUrl: '../shared/add-edit-worker.component.html'
})
export class WorkerEditComponent {
  uploader: any;
  workerInfo: {
    name: string;
    surname: string;
    email: string;
    position: string;
    project: string;
    skype: string;
    phone: string;
    bDay: string;
    avatar: any;
  };
  currentUser : any;
  uploadService : any;
  isEdit : boolean = true;
  imgService: any;
  loadingGif : any;
    constructor(
        private uploadAvatarService: UploadAvatarService,
        private workerEditService: WorkerEditService,
        private authService: AuthService,
        private nav: NavController,
        private workersService: WorkersService,
        private notificationsService: NotificationsService,
        private photoLibrary: PhotoLibrary,
        private loading: LoadingController,
        private img: ImgService,
    ) { }

  ionViewDidEnter() {

      this.currentUser = this.authService.getUserIdentity().user;
      if(this.workersService.currentWorker){
          this.workerInfo = this.workersService.currentWorker
      }else{
          this.nav.pop();
      }
      this.imgService = this.img;

      this.uploadService = this.uploadAvatarService;
      this.uploader = this.uploadService.initUploader();
      this.uploader.options.url = this.uploadAvatarService.setUploaderUrl('workerEdit');
      this.uploader.onAfterAddingFile = ((item:any) => {
          this.uploadAvatarService.onAfterAddingFile(item);
      });

      //TODO refactor this
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

    updateWorker(){
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
        }else {
          this.workerEditService.updateWorker(this.workerInfo, this.currentUser.currentCompany.companyId).subscribe(() => {
            this.loadingGif.dismiss();
            this.notificationsService.success(
                'Success',
                `Worker was updated successfully`
            );
            this.nav.pop();
          }, (result) => {
            this.loadingGif.dismiss();
            this.notificationsService.error(
                'Error',
                `${result.error}`
            )
          });
        }
    }
}
