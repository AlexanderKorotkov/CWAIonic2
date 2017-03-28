import {Request, Response} from '@angular/http';
import {HttpInterceptor} from 'angular2-http-interceptor';
import {Injectable} from '@angular/core';

import { LoadingController } from 'ionic-angular';

import { AuthService } from '../shared/auth/auth.service';

import {Observable} from 'rxjs';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class Interceptor implements HttpInterceptor {
    constructor(
        private authService: AuthService,
        private loading: LoadingController
    ) {}

    before(request: Request): Request {
      console.log(this.loading)
      this.loading.create()
      return request;
    }

    after(res: Observable<Response>): Observable<any> {
      console.log(this.loading)
        res.toPromise().then(data =>{
            if(data.status === 403){
                if (this.authService.isAuthenticated()) {
                    this.authService.removeUserIdentity();
                }
                // this.router.navigate(['/signIn']);
            }
        });
        // this.loading.dismiss()
        return res;
    }


}
