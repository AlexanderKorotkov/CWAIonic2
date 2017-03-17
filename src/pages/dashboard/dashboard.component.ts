import { Component } from '@angular/core';
import { MenuComponent } from './menu/menu.component';
import { WorkersComponent } from './workers/workers.component';

@Component({
    selector: 'dashboard',
    templateUrl: 'dashboard.component.html'
})
export class DashboardComponent{
  menu: any;
  workers: any;

  constructor() {
    this.menu = MenuComponent;
    this.workers = WorkersComponent;
  }
}
