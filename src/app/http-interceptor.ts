import {Request, Response} from '@angular/http';
import {HttpInterceptor} from 'angular2-http-interceptor';
import {Injectable} from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../shared/auth/auth.service';

import {Observable} from 'rxjs';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class Interceptor implements HttpInterceptor {
    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    before(request: Request): Request {
        return request;
    }

    after(res: Observable<Response>): Observable<any> {
        res.toPromise().then(data =>{
            if(data.status === 403){
                if (this.authService.isAuthenticated()) {
                    this.authService.removeUserIdentity();
                }
                this.router.navigate(['/signIn']);
            }
        });
        return res;
    }

}
