import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';

import { BrowserModule }           from '@angular/platform-browser';

/* Feature Modules */
// import {DashboardModule}           from './dashboard/dashboard.module';
// import {WorkersModule}             from './dashboard/workers/workers.module';
import {AuthModule}                from '../pages/auth/auth.module';
// import {MenuModule}                from './dashboard/menu/menu.module';
import {SharedModule}              from '../shared/shared.module';

/* Routing Module */
import {AppRoutingModule}          from './app-routing.module';

/* App Root */
import { AppComponent }            from './app.component';
import { LandingComponent }        from '../pages/landing/landing.component';


@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage
  ],
  imports: [
    IonicModule.forRoot(AppComponent),
    BrowserModule,
    SharedModule,
    AuthModule,
    AppRoutingModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AppComponent,
    LandingComponent,
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
