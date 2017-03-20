import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AuthService } from '../../../../shared/auth/auth.service';
import {NotificationsService} from 'angular2-notifications';

import { AddWorkerService } from './add-worker.service';
import { UploadAvatarService } from '../shared/upload-avatar.service';

@Component({
    selector: 'add-worker',
    templateUrl: '../shared/add-edit-worker.component.html'
})
export class AddWorkerComponent implements OnInit{

    constructor(
        private addWorkerService: AddWorkerService,
        private authService: AuthService,
        private uploadAvatarService: UploadAvatarService,
        private notificationsService: NotificationsService,
        private nav: NavController,
        private navParams: NavParams
    ) {
      this.uploadAvatarService.url = this.navParams.get('url');
    }
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
    };
    currentUser : any;

    ngOnInit() {

        this.workerInfo = {
            name: '',
            surname: '',
            email: '',
            position: '',
            project: '',
            skype: '',
            phone: '',
            bDay: ''
        };
        this.currentUser = this.authService.getUserIdentity().user;

        this.uploader = this.uploadAvatarService.uploader;
        this.uploader.options.url = this.uploadAvatarService.setUploaderUrl('addWorker');

        this.uploader.onAfterAddingFile = ((item:any) => {
            this.uploadAvatarService.onAfterAddingFile(item);
        });

    }

    onFileChange(event:any) {
        this.uploadAvatarService.target = event.target || event.srcElement;
    }

    sendUser(){
        if(this.uploader.queue[0]){
            this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
                this.uploadAvatarService.onBuildItemForm(fileItem, form, this.workerInfo, this.currentUser.currentCompany);
            };

            this.uploadAvatarService.uploadFile(this.uploader.queue[0]);
            this.uploader.onCompleteItem = (item:any, response:any, status:any) => {
                this.uploadAvatarService.onCompleteItem(item, response, status);
            };
        }else{
            this.addWorkerService.addWorker(this.workerInfo, this.currentUser.currentCompany).subscribe(() => {
                this.notificationsService.success(
                    'Success',
                    `Worker was created`
                );
                this.nav.pop();
            },(result) => {
                this.notificationsService.error(
                    'Error',
                    `${result.error}`
                )
            }) ;
        }

    }



}
