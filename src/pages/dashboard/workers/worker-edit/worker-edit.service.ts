import { Injectable }    from '@angular/core';
import { Http } from '@angular/http';

import { ConfigService } from '../../../../shared/config/config.service';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class WorkerEditService {

    constructor(
        private http: Http,
        private configService: ConfigService
    ) { }

    private workerEditUrl = `${this.configService.getConfig().apiMainUrl}/company/`;  // URL to web api

    updateWorker(worker:any, companyId:string): Observable<any> {
        return this.http.post(`${this.workerEditUrl}${companyId}/updateWorker`, {worker :worker})
            .map(response => response.json())
            .catch(err =>  Promise.reject(err.json()));
    }

}
