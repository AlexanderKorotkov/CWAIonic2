import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../../../shared/auth/auth.service';
import { WorkersService } from '../workers.service';
import { WorkerEditComponent } from '../worker-edit/worker-edit.component';

@Component({
    selector: 'worker-details',
    templateUrl: 'worker-details.component.html'
})
export class WorkerDetailsComponent implements OnInit{

    currentUser:any;
    worker:any;
    editPage:any;

    constructor(
        private workersService: WorkersService,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.currentUser = this.authService.getUserIdentity().user;
        this.editPage = WorkerEditComponent;
        if(this.workersService.currentWorker){
            this.worker = this.workersService.currentWorker
        }
    }
}
