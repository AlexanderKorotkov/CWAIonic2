import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../../../shared/auth/auth.service';
import {NotificationsService} from 'angular2-notifications';

import { SelectCompanyService } from './select-company.service';

@Component({
    selector: 'select-company',
    templateUrl: 'select-company.component.html'
})
export class SelectCompanyComponent implements OnInit{

    currentUser : any;
    companyList : any;
    selectedCompany :any;

    constructor(
        private authService: AuthService,
        private notificationsService: NotificationsService,
        private selectCompanyService: SelectCompanyService
    ) { }
    ngOnInit() {
        this.currentUser = this.authService.getUserIdentity().user;

        this.selectedCompany = this.currentUser.currentCompany ? this.currentUser.currentCompany.companyName : '';
        this.selectCompanyService.getUserCompanyList(this.currentUser._id).subscribe(
            result => {
                this.companyList = result;
                if(!result){
                    this.notificationsService.info(
                        'Oops',
                        `You are do not have any companies!`
                    )
                }
            },
            err => {
                this.notificationsService.error(
                    'Error',
                    `${err}`
                )
            }
        );
    }

    selectCompany(company:any) {
        if(this.selectedCompany === company.companyName){
            return false;
        }
        this.selectCompanyService.selectCompany(this.currentUser._id, company).subscribe(result => {
            this.currentUser.currentCompany = result.data.currentCompany;
            this.currentUser.role = result.data.role;
            this.authService.updateUserIdentity(this.currentUser);

            this.notificationsService.success(
                'Company was changed to :',
                `${result.data.currentCompany.companyName}`,
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
