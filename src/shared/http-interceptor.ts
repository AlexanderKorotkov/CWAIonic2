
import { Injectable } from '@angular/core';
import { Request, XHRBackend, RequestOptions, Response, Http, RequestOptionsArgs, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class HttpInterceptorService extends Http {

    constructor(backend: XHRBackend, defaultOptions: RequestOptions, private router: Router, private authService: AuthService) {
        super(backend, defaultOptions);
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        //do whatever
        if (typeof url === 'string') {
            if (!options) {
                options = { headers: new Headers() };
            }
            this.setHeaders(options);
        } else {
            this.setHeaders(url);
        }

        return super.request(url, options).catch(this.catchErrors());
    }

    private catchErrors() {
        return (res: Response) => {
            if (res.status === 401 || res.status === 403) {
                //handle authorization errors
                //in this example I am navigating to logout route which brings the login screen
                if (this.authService.isAuthenticated()) {
                    this.authService.removeUserIdentity();
                }
                this.router.navigate(['/signIn']);
            }
            return Observable.throw(res);
        };
    }

    private setHeaders(objectToSetHeadersTo: Request | RequestOptionsArgs) {
        //add whatever header that you need to every request
        objectToSetHeadersTo.headers.set('Content-Type', 'application/json');
        objectToSetHeadersTo.headers.set('authorization', `${this.authService.getAuthorizationHeader()}`);
    }

}
