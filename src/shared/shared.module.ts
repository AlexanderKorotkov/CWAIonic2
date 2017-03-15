import { NgModule }                from '@angular/core';

import { BrowserModule }           from '@angular/platform-browser';
import { FormsModule }             from '@angular/forms';
import { HttpModule }              from '@angular/http';
import { CommonModule }        from '@angular/common';
import {SimpleNotificationsModule} from 'angular2-notifications';
import {NotificationsService}      from 'angular2-notifications';

import {Http}                      from '@angular/http';
import {HttpInterceptorService}    from './http-interceptor';

import { AuthService }              from './auth/auth.service';
import { ConfigService }            from './config/config.service';

@NgModule({
    exports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        SimpleNotificationsModule,
        CommonModule
    ],
    providers: [
        AuthService,
        ConfigService,
        NotificationsService,
        { provide: Http, useClass: HttpInterceptorService }
    ]
})

export class SharedModule { }
