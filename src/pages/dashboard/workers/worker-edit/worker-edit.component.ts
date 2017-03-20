import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {NotificationsService} from 'angular2-notifications';

import { AuthService } from '../../../../shared/auth/auth.service';
import { WorkerEditService } from './worker-edit.service';
import { WorkersService } from '../workers.service';
import { UploadAvatarService } from '../shared/upload-avatar.service';

@Component({
    selector: 'worker-edit',
    templateUrl: '../shared/add-edit-worker.component.html'
})
export class WorkerEditComponent implements OnInit{

    constructor(
        private uploadAvatarService: UploadAvatarService,
        private workerEditService: WorkerEditService,
        private authService: AuthService,
        private location: Location,
        private workersService: WorkersService,
        private notificationsService: NotificationsService
    ) { }

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
    isEdit : boolean = true;

    ngOnInit() {

        this.currentUser = this.authService.getUserIdentity().user;
        if(this.workersService.currentWorker){
            this.workerInfo = this.workersService.currentWorker
        }else{
            this.location.back();
        }

        this.uploader = this.uploadAvatarService.uploader;
        this.uploader.options.url = this.uploadAvatarService.setUploaderUrl('workerEdit');
        this.uploader.onAfterAddingFile = ((item:any) => {
            this.uploadAvatarService.onAfterAddingFile(item);
        });
    }

    onFileChange(event:any) {
        this.uploadAvatarService.target = event.target || event.srcElement;
    }

    updateWorker(){
        if(this.uploader.queue[0]){
            this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
                this.uploadAvatarService.onBuildItemForm(fileItem, form, this.workerInfo, this.currentUser.currentCompany);
            };

            this.uploadAvatarService.uploadFile(this.uploader.queue[0]);
            this.uploader.onCompleteItem = (item:any, response:any, status:any) => {
                this.uploadAvatarService.onCompleteItem(item, response, status);
            };
        }else {
            this.workerEditService.updateWorker(this.workerInfo, this.currentUser.currentCompany.companyId).subscribe(() => {
                this.location.back();
                this.notificationsService.success(
                    'Success',
                    `Worker was updated successfully`
                )
            }, (result) => {
                this.notificationsService.error(
                    'Error',
                    `${result.error}`
                )
            });
        }
    }
}
