import { Component, OnInit } from '@angular/core';
import {NotificationsService} from 'angular2-notifications';
import { NavController, Nav } from 'ionic-angular';

import { SignInService } from './sign-in.service';
import { SignInFields } from './sign-in-fields';
import { SignUpComponent } from '../signUp/sign-up.component';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { AuthService } from '../../../shared/auth/auth.service';
import { ConfigService } from '../../../shared/config/config.service';


@Component({
    selector: 'sign-in',
    templateUrl: 'sign-in.component.html'
})
export class SignInComponent implements OnInit{
    constructor(
        private signInService: SignInService,
        private configService: ConfigService,
        private authService: AuthService,
        private navCtrl: NavController,
        private nav: Nav,
        private notificationsService: NotificationsService
    ) { }
    signInData: SignInFields;

    ngOnInit() {
        // initialize user model here
        this.signInData = {
            password: '',
            email: '',
            client_id: this.configService.getConfig().client_id,
            client_secret: this.configService.getConfig().client_secret
        }
    }

    signIn() {
        this.signInService.signIn(this.signInData).subscribe(result => {
            if(this.authService.setUserIdentity(result)){
                this.nav.setRoot(DashboardComponent)
            }
        },(result) => {
            this.notificationsService.error(
                'Error',
                `${result.error}`
            )
        }) ;
    }
    navOnSignUp() {
      this.navCtrl.push(SignUpComponent);
    }

}
