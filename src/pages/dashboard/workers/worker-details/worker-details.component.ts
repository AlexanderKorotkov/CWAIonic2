import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
// import {Calendar} from '@ionic-native/calendar';

import { AuthService } from '../../../../shared/auth/auth.service';
import { WorkersService } from '../workers.service';
import { WorkerEditComponent } from '../worker-edit/worker-edit.component';
import { ImgService } from '../../../../shared/img-service/img.service';

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
        // private calendar: Calendar
    ) {
      this.currentUser = this.authService.getUserIdentity().user;
      this.editPage = WorkerEditComponent;
      this.imgService = this.img;
      if(this.workersService.currentWorker){
        this.worker = this.workersService.currentWorker;
      }


      // this.calendar.createCalendar('MyCalendar').then(
      //   (msg) => { console.log(msg); },
      //   (err) => { console.log(err); }
      // );


    }

  // ionViewDidEnter() {
  //   this.calendar.createEvent('title', 'location', 'notes', new Date(), new Date()).then(
  //     (msg) => { console.log(msg); },
  //     (err) => { console.log(err); }
  //   );
  // }
  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

}
