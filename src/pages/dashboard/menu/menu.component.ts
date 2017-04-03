import { Component } from '@angular/core';

import { AuthService } from '../../../shared/auth/auth.service';
import { NavController } from 'ionic-angular';
import { ChangePasswordComponent } from './changePassword/change-password.component';
import { SelectCompanyComponent }  from './selectCompany/select-company.component';
import { CreateCompanyComponent }  from './createCompany/create-company.component';
import { SignInComponent }          from '../../auth/signIn/sign-in.component';

@Component({
    selector: 'menu-page',
    templateUrl: 'menu.component.html'
})
export class MenuComponent{
    currentUser : any;
    changePasswordPage : any;
    selectCompanyPage : any;
    createCompanyPage : any;
    constructor(
        private authService: AuthService,
        private nav: NavController,

    ) {}
  ionViewDidEnter() {
        this.changePasswordPage = ChangePasswordComponent;
        this.selectCompanyPage = SelectCompanyComponent;
        this.createCompanyPage = CreateCompanyComponent;

        this.currentUser = this.authService.getUserIdentity().user;
    }

    logOut(){
      this.authService.removeUserIdentity();
      this.nav.setRoot(SignInComponent)
    };

}
