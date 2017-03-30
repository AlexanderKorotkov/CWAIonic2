import { Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'worker',
    templateUrl: 'worker.component.html'
})

export class WorkerComponent{
    @Input() worker: any;
    @Input() canDelete: boolean;
    @Output() deleteWorker = new EventEmitter();
    @Output() goToWorkerDetails = new EventEmitter();
    default_image: any ='/assets/img/ionic.png' ;

    remove(event:any, worker:any){
        event.stopPropagation();
        this.deleteWorker.emit(worker)
    }

    workerDetails(worker:any){
        this.goToWorkerDetails.emit(worker);
    };

    updateUrl(avatar:any){
      avatar.imageThumbUrl = '/assets/img/ionic.png';
    };
}
