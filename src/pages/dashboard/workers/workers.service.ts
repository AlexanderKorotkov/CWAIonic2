import { Injectable }    from '@angular/core';
import { Http } from '@angular/http';

import { ConfigService } from '../../../shared/config/config.service';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class WorkersService {
    public currentWorker: any;

    public getUserList = function(userId:string) {
    for (var i = 0; i < this.workers.length; i++) {
        if (this.workers[i].userId === userId) {
            return this.workers[i];
        }
    }
    return null;
};

    constructor(
        private http: Http,
        private configService: ConfigService
    ) { }

    private fetchCompanyWorkersUrl = `${this.configService.getConfig().apiMainUrl}/company/`;  // URL to web api
    private removeUserUrl = `${this.configService.getConfig().apiMainUrl}/company/`;  // URL to web api

    fetchCompanyWorkers(companyId:string, userId:string):Observable<any> {
        return this.http.get(`${this.fetchCompanyWorkersUrl}${companyId}/${userId}/fetchWorkers`)
            .map(response => response.json())
            .catch(err =>  Promise.reject(err.json()));
    }

    deleteWorker(companyId:string, worker:any):Observable<any> {
        return this.http.post(`${this.removeUserUrl}${companyId}/deleteWorker`, {worker:worker})
            .map(response => response.json())
            .catch(err =>  Promise.reject(err.json()));
    }

}
