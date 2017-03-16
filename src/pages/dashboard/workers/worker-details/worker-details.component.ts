import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { AuthService } from '../../../../shared/auth/auth.service';
import { WorkersService } from '../workers.service';

@Component({
    selector: 'worker-details',
    templateUrl: 'worker-details.component.html'
})
export class WorkerDetailsComponent implements OnInit{

    currentUser:any;
    worker:any;

    constructor(
        private location: Location,
        private workersService: WorkersService,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.currentUser = this.authService.getUserIdentity().user;
        if(this.workersService.currentWorker){
            this.worker = this.workersService.currentWorker
        }else{
            this.location.back();
        }
    }
}
