import { Component }    from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService }          from '../../../shared/auth/auth.service';
import {NotificationsService}   from 'angular2-notifications';
import { LoadingController } from 'ionic-angular';


import { WorkersService }       from './workers.service';
import { WorkerComponent }      from './worker/worker.component';
import { AddWorkerComponent }   from './add-worker/add-worker.component';
import { WorkerDetailsComponent }   from './worker-details/worker-details.component';

@Component({
    selector: 'workers',
    templateUrl: 'workers.component.html',
    entryComponents: [WorkerComponent]
})
export class WorkersComponent {

    currentUser : any;
    workers:any;
    addWorkerPage:any;
    canDelete:boolean = false;
    test : any

    constructor(
        private nav: NavController,
        private workersService: WorkersService,
        private authService: AuthService,
        private notificationsService: NotificationsService,
        private loading: LoadingController
    ) { }
  ionViewDidEnter() {
        this.currentUser = this.authService.getUserIdentity().user;
        this.addWorkerPage = AddWorkerComponent;

        if(!this.currentUser.currentCompany){
            this.notificationsService.alert(
                'Warning',
                `Please select a company`
            );
        }else{
            this.workersService.fetchCompanyWorkers(this.currentUser.currentCompany.companyId, this.currentUser._id).subscribe(result => {
              this.test = this.loading.create();
              this.test.present();
                this.workers = result.data;
                this.authService.getUserIdentity()
            },(result) => {
              this.test.dismiss();
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
        this.nav.push(WorkerDetailsComponent);
    }

    showDeleteButton(){
        this.canDelete = !this.canDelete;
    };

    logOut(){
        this.authService.removeUserIdentity();
        // this.route.navigate([`${'/'}`])
    };

}
