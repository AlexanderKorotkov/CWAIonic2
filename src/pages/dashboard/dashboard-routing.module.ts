import { NgModule }                from '@angular/core';
import { RouterModule, Routes }    from '@angular/router';

import { AuthService }             from '../../shared/auth/auth.service';

import { DashboardComponent }      from './dashboard.component';

import { WorkersComponent }         from './workers/workers.component';
import { MenuComponent }            from './menu/menu.component';


const routes: Routes = [
    { path: '',  component: DashboardComponent, canActivate: [AuthService],
        children: [
            { path: 'workers', component: WorkersComponent, canActivate: [AuthService] },
            { path: 'menu',  component: MenuComponent, canActivate: [AuthService] },
        ],
    }


];
@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class DashboardRoutingModule {}
