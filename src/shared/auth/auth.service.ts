import { Injectable }    from '@angular/core';
import { Location }    from '@angular/common';
import { Router, CanActivate } from '@angular/router';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService implements CanActivate {
    identity : any;

    constructor(
        private router: Router,
        private location: Location,

    ) { }

    canActivate() {
        if (localStorage.getItem('identity')) {
            // logged in so return true
            return true;
        }


        // not logged in so redirect to login page
        this.router.navigate(['']);
        return false;
    }


    private getIdentity() {
        if (null !== localStorage.getItem("identity")) {
            this.identity = JSON.parse(localStorage.getItem("identity"));
            console.log("User loaded from local storage");
        }
    };

    private saveIdentity() {
        localStorage.setItem("identity", JSON.stringify(this.identity));
    };

    private removeIdentity() {
        localStorage.removeItem("identity");
        this.identity = null;
    };

    updateIdentityProfile(profile:any) {
        this.identity.user.profile = profile;
        this.saveIdentity();
        return true;
    };

    setUserIdentity (user:any) {
        if (user) {
            this.identity = user;
            this.saveIdentity();
            return true;
        }
        console.log("User Identity has to have access_token");
        return false;
    };

    getUserIdentity () {
        this.getIdentity();
        return this.identity;
    };

    updateUserIdentity (user:any) {
        this.identity.user = user;
        localStorage.setItem("identity", JSON.stringify(this.identity));
    };

    removeUserIdentity () {
        this.removeIdentity();
        return true;
    };

    isAuthenticated () {
        return this.identity !== null;
    };

    getAuthorizationHeader () {
        return !this.identity ? null : this.identity.token;
    }
}


