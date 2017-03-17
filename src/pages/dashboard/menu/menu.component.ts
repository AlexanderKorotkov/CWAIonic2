import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../../shared/auth/auth.service';
import { NavController } from 'ionic-angular';
import { ChangePasswordComponent } from './changePassword/change-password.component';
import { SelectCompanyComponent }  from './selectCompany/select-company.component';
import { CreateCompanyComponent }  from './createCompany/create-company.component';

@Component({
    selector: 'menu-page',
    templateUrl: 'menu.component.html'
})
export class MenuComponent implements OnInit{
    currentUser : any;
    changePasswordPage : any;
    selectCompanyPage : any;
    createCompanyPage : any;
    constructor(
        private authService: AuthService,
        private navController: NavController,

    ) {}
    ngOnInit() {
        this.changePasswordPage = ChangePasswordComponent;
        this.selectCompanyPage = SelectCompanyComponent;
        this.createCompanyPage = CreateCompanyComponent;

        this.currentUser = this.authService.getUserIdentity().user;
    }
    test(){
      this.navController.push(ChangePasswordComponent)
    }

}
