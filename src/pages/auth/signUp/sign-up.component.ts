import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import {NotificationsService} from 'angular2-notifications';

import { SignUpService } from './sign-up.service';
import { SignUpFields } from './sign-up-fields';

@Component({
    selector: 'sign-up',
    templateUrl: 'sign-up.component.html'
})
export class SignUpComponent implements OnInit{
    signUpData: SignUpFields;

    constructor(
        private signUpService: SignUpService,
        private notificationsService: NotificationsService,
        private navCtrl: NavController
    ) { }

    ngOnInit() {
        // initialize user model here
        this.signUpData = {
            companyName: '',
            password: '',
            repeatPassword: '',
            email: '',
        }
    }

    signUp() {
        this.signUpService.signUp(this.signUpData).subscribe(result => {
            this.navCtrl.pop();
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
