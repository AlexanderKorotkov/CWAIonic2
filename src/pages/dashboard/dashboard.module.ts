import { NgModule }                from '@angular/core';

import {SharedModule}              from '../../shared/shared.module';
import { SuperTabsModule } from 'ionic2-super-tabs';

import { DashboardComponent }      from './dashboard.component';



@NgModule({
    imports: [
      SharedModule,
      SuperTabsModule.forRoot()
    ],
    declarations: [
        DashboardComponent
    ],
    entryComponents: [
      DashboardComponent
    ]

})
export class DashboardModule { }
