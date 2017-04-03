import { Component, Input, Output, EventEmitter} from '@angular/core';
import { ImgService } from '../../../../shared/img-service/img.service';

@Component({
    selector: 'worker',
    templateUrl: 'worker.component.html'
})

export class WorkerComponent{
  imgService: any;
  constructor(
    private img: ImgService,
  ) {
    this.imgService = this.img;
  }

    @Input() worker: any;
    @Input() canDelete: boolean;
    @Output() deleteWorker = new EventEmitter();
    @Output() goToWorkerDetails = new EventEmitter();
    default_image: any ='assets/img/ionic.png' ;

    remove(event:any, worker:any){
        event.stopPropagation();
        this.deleteWorker.emit(worker)
    }

    workerDetails(worker:any){
        this.goToWorkerDetails.emit(worker);
    };

}
