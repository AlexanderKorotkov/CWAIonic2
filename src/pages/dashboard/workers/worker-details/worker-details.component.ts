import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
// import {Calendar} from '@ionic-native/calendar';

import { AuthService } from '../../../../shared/auth/auth.service';
import { WorkersService } from '../workers.service';
import { WorkerEditComponent } from '../worker-edit/worker-edit.component';

@Component({
    selector: 'worker-details',
    templateUrl: 'worker-details.component.html'
})
export class WorkerDetailsComponent {

    currentUser:any;
    worker:any;
    editPage:any;
    default_image: any = '/assets/img/ionic.png' ;

    constructor(
        private workersService: WorkersService,
        private authService: AuthService,
        private sanitizer: DomSanitizer,
        // private calendar: Calendar
    ) {
      this.currentUser = this.authService.getUserIdentity().user;
      this.editPage = WorkerEditComponent;
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

  updateUrl(avatar:any){
    avatar.imageThumbUrl = this.default_image;
  };
}
