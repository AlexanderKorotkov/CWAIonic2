import { Component, OnInit } from '@angular/core';
// import * as _ from 'lodash';
import { Router } from '@angular/router';
import {NotificationsService} from 'angular2-notifications';

import { SignInService } from './sign-in.service';
import { SignInFields } from './sign-in-fields';
import { AuthService } from '../../../shared/auth/auth.service';
import { ConfigService } from '../../../shared/config/config.service';


@Component({
    selector: 'sign-in',
    templateUrl: 'sign-in.component.html'
})
export class SignInComponent implements OnInit{
    constructor(
        private signInService: SignInService,
        private route: Router,
        private configService: ConfigService,
        private authService: AuthService,
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
                this.route.navigate(['/menu']);
            }
        },(result) => {
            this.notificationsService.error(
                'Error',
                `${result.error}`
            )
        }) ;
    }
}
