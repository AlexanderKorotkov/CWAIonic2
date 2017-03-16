import { NgModule }                from '@angular/core';

import {SharedModule}              from '../../../shared/shared.module';

import { MenuRoutingModule }       from './menu-routing.module';

import { MenuComponent }           from './menu.component';
import { ChangePasswordComponent } from './changePassword/change-password.component';
import { CreateCompanyComponent }  from './createCompany/create-company.component';
import { SelectCompanyComponent }  from './selectCompany/select-company.component';

import { ChangePasswordService }   from './changePassword/change-password.service';
import { CreateCompanyService }    from './createCompany/create-company.service';
import { SelectCompanyService }    from './selectCompany/select-company.service';


@NgModule({
    imports: [
        MenuRoutingModule,
        SharedModule
    ],
    declarations: [
        MenuComponent,
        ChangePasswordComponent,
        SelectCompanyComponent,
        CreateCompanyComponent
    ],
    providers: [
        ChangePasswordService,
        SelectCompanyService,
        CreateCompanyService
    ]
})
export class MenuModule { }
