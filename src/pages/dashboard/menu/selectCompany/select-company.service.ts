import { Injectable }    from '@angular/core';
import { Http } from '@angular/http';

import { ConfigService } from '../../../../shared/config/config.service';

import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class SelectCompanyService {
    constructor(
        private http: Http,
        private configService: ConfigService
    ) { }
    private getUserCompanyListUrl = `${this.configService.getConfig().apiMainUrl}/company/`;  // URL to web api
    private selectCompanyUrl = `${this.configService.getConfig().apiMainUrl}/company/selectCompany`;  // URL to web api

    getUserCompanyList(userId:string):Observable<string> {
        return this.http.get(`${this.getUserCompanyListUrl}${userId}/getUserCompanyList`)
            .map((res) => res.json())
            .catch((err:any) => Observable.throw(err.json().error || 'Server error'));
    }

    selectCompany(userId:string, company:any):Observable<any> {
        return this.http.post(`${this.selectCompanyUrl}`, {userId:userId, companyInfo: company})
            .map((res) => res.json())
            .catch((err:any) => Observable.throw(err.json().error || 'Server error'));
    }

}
