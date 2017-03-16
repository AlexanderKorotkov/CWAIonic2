import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../../shared/auth/auth.service';
import {NotificationsService} from 'angular2-notifications';

import { CreateCompanyService } from './create-company.service';
import { CreateCompanyFields } from './create-company-fields';

@Component({
    selector: 'create-company',
    templateUrl: 'create-company.component.html'
})
export class CreateCompanyComponent implements OnInit{
    companyData: CreateCompanyFields;
    currentUser : any;

    constructor(
        private authService: AuthService,
        private notificationsService: NotificationsService,
        private router: Router,
        private createCompanyService: CreateCompanyService
    ) { }
    ngOnInit() {
        this.currentUser = this.authService.getUserIdentity().user;
        this.companyData = {
            companyName: '',
            companyNameRepeat: ''
        }
    }

    create() {
        this.createCompanyService.createCompany(this.companyData, this.currentUser._id).subscribe(result => {
            this.router.navigate(['/dashboard/menu']);
            this.notificationsService.success(
                'Success',
                `${result.message}`,
                {
                    position: ["bottom", "right"],
                    timeOut: 5000,
                    lastOnBottom: true
                }
            );

        },(result) => {
            this.notificationsService.error(
                'Error',
                `${result.error}`
            )
        }) ;
    }

}
