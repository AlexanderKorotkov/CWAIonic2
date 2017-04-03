import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {Calendar} from '@ionic-native/calendar';

import { AuthService } from '../../../../shared/auth/auth.service';
import { WorkersService } from '../workers.service';
import { WorkerEditComponent } from '../worker-edit/worker-edit.component';
import { ImgService } from '../../../../shared/img-service/img.service';
import * as moment from 'moment';

@Component({
    selector: 'worker-details',
    templateUrl: 'worker-details.component.html'
})
export class WorkerDetailsComponent {

    currentUser:any;
    worker:any;
    editPage:any;
    imgService:any;

    constructor(
        private workersService: WorkersService,
        private authService: AuthService,
        private sanitizer: DomSanitizer,
        private img: ImgService,
        private calendar: Calendar
    ) { }

  ionViewDidEnter() {
    this.currentUser = this.authService.getUserIdentity().user;
    this.editPage = WorkerEditComponent;
    this.imgService = this.img;
    if(this.workersService.currentWorker){
      this.worker = this.workersService.currentWorker;
      this.worker.bDay = moment(this.worker.bDay).format('DD-MM-YYYY');
    }




  }

  createCalendarBDayEvent(bDay:any){
    let eventDate = moment(bDay).set('year', moment().year()).toDate();
    let options = this.calendar.getCalendarOptions();
    this.calendar.createEventInteractivelyWithOptions(`${this.worker.name}  ${this.worker.surname} Birthday`, '', '', eventDate, eventDate, options).then(
      (msg) => { console.log(JSON.stringify(msg)) },
      (err) => { console.log(JSON.stringify(err)); }
    );
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

}
