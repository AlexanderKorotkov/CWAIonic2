import { Injectable }    from '@angular/core';
import { Http } from '@angular/http';

import { ConfigService } from '../../../../shared/config/config.service';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AddWorkerService {

    constructor(
        private http: Http,
        private configService: ConfigService
    ) { }
    private addWorkerUrl = `${this.configService.getConfig().apiMainUrl}/company/addWorker`;  // URL to web api

    addWorker(worker:any, company:any): Observable<any> {
        return this.http.post(this.addWorkerUrl, {worker :worker, company : company} )
            .map(response => response.json())
            .catch(err =>  Promise.reject(err.json()));
    }

}
