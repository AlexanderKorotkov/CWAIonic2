import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {NotificationsService} from 'angular2-notifications';
import { PhotoLibrary } from '@ionic-native/photo-library';

import { Validators, FormGroup, FormControl} from '@angular/forms';

import { AuthService } from '../../../../shared/auth/auth.service';
import { WorkerEditService } from './worker-edit.service';
import { WorkersService } from '../workers.service';
import { UploadAvatarService } from '../shared/upload-avatar.service';
import { ImgService } from '../../../../shared/img-service/img.service';
import { LoadingController } from 'ionic-angular';
import * as moment from 'moment';

@Component({
    selector: 'worker-edit',
    templateUrl: '../shared/add-edit-worker.component.html'
})
export class WorkerEditComponent {
  uploader: any;
  workerInfo: any;
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
          // this.workerInfo = this.workersService.currentWorker
        console.log(this.workersService.currentWorker.name)
        this.workerInfo = new FormGroup({
          name: new FormControl(this.workersService.currentWorker.name, Validators.required),
          surname: new FormControl(this.workersService.currentWorker.surname, Validators.required),
          email: new FormControl(this.workersService.currentWorker.email,[Validators.required,Validators.pattern("[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)")]),
          position: new FormControl(this.workersService.currentWorker.position),
          project: new FormControl(this.workersService.currentWorker.project),
          skype: new FormControl(this.workersService.currentWorker.skype),
          phone: new FormControl(this.workersService.currentWorker.phone),
          bDay: new FormControl(moment(this.workersService.currentWorker.bDay).toDate()),
          avatar: new FormControl(this.workersService.currentWorker.avatar),
          _id:new FormControl(this.workersService.currentWorker._id),
        });
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
      if(!this.workerInfo.valid){
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
              this.uploadAvatarService.onBuildItemForm(fileItem, form, this.workerInfo.value, this.currentUser.currentCompany);
          };

          this.uploadAvatarService.uploadFile(this.uploader.queue[0]);
          console.log(this.uploader.queue[0])
          this.uploader.onCompleteItem = (item:any, response:any, status:any) => {
            if(status === 200){this.workersService.currentWorker = this.workerInfo.value;}
            this.loadingGif.dismiss();
            this.uploadAvatarService.onCompleteItem(item, response, status);
          };
        }else {
          this.workerEditService.updateWorker(this.workerInfo.value, this.currentUser.currentCompany.companyId).subscribe(() => {
            this.workersService.currentWorker = this.workerInfo.value;
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
