import { NgModule }                from '@angular/core';
import { RouterModule, Routes }    from '@angular/router';

import { SignInComponent }         from './signIn/sign-in.component';
import { SignUpComponent }         from './signUp/sign-up.component';

const routes: Routes = [
    { path: 'signIn',  component: SignInComponent },
    { path: 'signUp',  component: SignUpComponent}
];
@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AuthRoutingModule {}
