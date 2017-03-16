import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'landing',
    templateUrl: 'landing.component.html'
})
export class LandingComponent implements OnInit{
    constructor(
        private router: Router
    ) { }
    ngOnInit() {


    }

  chat() {
    console.log(123)
  }

}
