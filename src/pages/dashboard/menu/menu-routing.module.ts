import { NgModule }                from '@angular/core';
import { RouterModule, Routes }    from '@angular/router';

import { AuthService }             from '../../../shared/auth/auth.service';

import { ChangePasswordComponent } from './changePassword/change-password.component';
import { SelectCompanyComponent }  from './selectCompany/select-company.component';
import { CreateCompanyComponent }  from './createCompany/create-company.component';

const routes: Routes = [
    { path: 'changePassword',  component: ChangePasswordComponent, canActivate: [AuthService] },
    { path: 'selectCompany',  component: SelectCompanyComponent, canActivate: [AuthService] },
    { path: 'createCompany',  component: CreateCompanyComponent, canActivate: [AuthService] },

];
@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class MenuRoutingModule {}
