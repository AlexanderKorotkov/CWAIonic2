import { Injectable }    from '@angular/core';
import { Http } from '@angular/http';

import { ConfigService } from '../../../../shared/config/config.service';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ChangePasswordService {
    constructor(
        private http: Http,
        private configService: ConfigService
    ) { }

    private changePasswordUrl = `${this.configService.getConfig().apiMainUrl}/session/updatePassword`;  // URL to web api

    updatePassword(passwordData:any, userId:string):Observable<any> {
        return this.http.post(this.changePasswordUrl, {passwordData:passwordData, userId:userId})
            .map(response => response.json())
            .catch(err =>  Promise.reject(err.json()));
    }

}
