import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';

import { BrowserModule }           from '@angular/platform-browser';

/* Feature Modules */
import {DashboardModule}           from '../pages/dashboard/dashboard.module';
import {WorkersModule}             from '../pages/dashboard/workers/workers.module';
import {AuthModule}                from '../pages/auth/auth.module';
import {MenuModule}                from '../pages/dashboard/menu/menu.module';
import {SharedModule}              from '../shared/shared.module';

/* App Root */
import { AppComponent }            from './app.component';


@NgModule({
  declarations: [
    AppComponent,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage
  ],
  imports: [
    IonicModule.forRoot(AppComponent),
    BrowserModule,
    SharedModule,
    AuthModule,
    DashboardModule,
    WorkersModule,
    MenuModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AppComponent,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: IonicErrorHandler
    }
  ]
})
export class AppModule {}
