import { NgModule }                from '@angular/core';
import { RouterModule, Routes }    from '@angular/router';

import { AuthService }             from '../../../shared/auth/auth.service';

import { AddWorkerComponent }      from './add-worker/add-worker.component';
import { WorkerDetailsComponent }  from './worker-details/worker-details.component';
import { WorkerEditComponent }     from './worker-edit/worker-edit.component';

const routes: Routes = [
    { path: 'addWorker',  component: AddWorkerComponent, canActivate: [AuthService] },
    { path: 'workerDetails',  component: WorkerDetailsComponent, canActivate: [AuthService] },
    { path: 'workerEdit',  component: WorkerEditComponent, canActivate: [AuthService] },
];
@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class WorkersRoutingModule {}
