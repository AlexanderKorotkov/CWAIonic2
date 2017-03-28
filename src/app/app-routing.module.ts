import { NgModule }                from '@angular/core';
import { RouterModule, Routes }    from '@angular/router';

import { SignInComponent }        from '../pages/auth/signIn/sign-in.component';

const routes: Routes = [
  { path: '',  component: SignInComponent },
  // { path: '**', redirectTo: '/signIn', pathMatch: 'full'},
];@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
