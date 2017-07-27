import { Component } from '@angular/core';
import { App } from 'ionic-angular';

import { AuthService } from '../../../shared/auth/auth.service';
import { ChangePasswordComponent } from './changePassword/change-password.component';
import { SelectCompanyComponent }  from './selectCompany/select-company.component';
import { CreateCompanyComponent }  from './createCompany/create-company.component';
import { SignInComponent }          from '../../auth/signIn/sign-in.component';
import {SuperTabs} from "ionic2-super-tabs";

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
        private superTabs: SuperTabs,
        private app: App,

    ) {}

  ionViewWillLeave(){
    this.superTabs.showToolbar(false);
  }
  ionViewDidEnter() {
        this.changePasswordPage = ChangePasswordComponent;
        this.selectCompanyPage = SelectCompanyComponent;
        this.createCompanyPage = CreateCompanyComponent;
        this.currentUser = this.authService.getUserIdentity().user;
    this.superTabs.showToolbar(true);
    }

    logOut(){
      this.authService.removeUserIdentity();
      this.app.getRootNav().setRoot(SignInComponent);
    };

}
