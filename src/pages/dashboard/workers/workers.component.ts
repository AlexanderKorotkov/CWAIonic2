import { Component, OnInit }    from '@angular/core';
import { Router }               from '@angular/router';

import { AuthService }          from '../../../shared/auth/auth.service';
import {NotificationsService}   from 'angular2-notifications';

import { WorkersService }       from './workers.service';
import { WorkerComponent }      from './worker/worker.component';

@Component({
    selector: 'workers',
    templateUrl: 'workers.component.html',
    entryComponents: [WorkerComponent]
})
export class WorkersComponent implements OnInit{

    currentUser : any;
    workers:any;
    canDelete:boolean = false;

    constructor(
        private route: Router,
        private workersService: WorkersService,
        private authService: AuthService,
        private notificationsService: NotificationsService
    ) { }
    ngOnInit() {
        this.currentUser = this.authService.getUserIdentity().user;

        if(!this.currentUser.currentCompany){
            this.notificationsService.alert(
                'Warning',
                `Please select a company`
            );
        }else{
            this.workersService.fetchCompanyWorkers(this.currentUser.currentCompany.companyId, this.currentUser._id).subscribe(result => {
                this.workers = result.data;
                this.authService.getUserIdentity()
            },(result) => {
                this.notificationsService.error(
                    'Error',
                    `${result.error}`
                )
            }) ;
        }

    }

    deleteWorker(worker:any) {
        this.workersService.deleteWorker(this.currentUser.currentCompany.companyId, worker).subscribe(result => {
            this.workers.splice(this.workers.indexOf(worker), 1);
            this.notificationsService.success(
                'Success',
                `${'Worker was deleted successfully'}`
            )
        },(result) => {
            this.notificationsService.error(
                'Error',
                `${result.error}`
            )
        }) ;
    }

    goToWorkerDetails(worker:any) {
        this.workersService.currentWorker = worker;
        this.route.navigate([`${'/workerDetails/'}`])
    }

    showDeleteButton(){
        this.canDelete = !this.canDelete;
    };

    logOut(){
        this.authService.removeUserIdentity();
        this.route.navigate([`${'/'}`])
    };

}
