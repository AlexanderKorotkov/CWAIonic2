import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { StatusBar, Splashscreen } from 'ionic-native';

import { AuthService }          from '../shared/auth/auth.service';
import { SignInComponent } from '../pages/auth/signIn/sign-in.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';


@Component({
  templateUrl: 'app.html'
})
export class AppComponent {
  @ViewChild(Nav) nav: Nav;
  currentUser : any;
  // make HelloIonicPage the root (or first) page
  rootPage: any = SignInComponent;
  // pages: Array<{title: string, component: any}>;

  public options = {
    position: ["bottom", "right"],
    timeOut: 5000,
    lastOnBottom: true
  };

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public authService: AuthService
  ) {
    this.initializeApp();

    // set our app's pages
    // this.pages = [
    //   { title: 'Hello Ionic', component: SignInComponents },
    //   { title: 'My First List', component: ListPage }
    // ];
  }



  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
    this.currentUser = this.authService.getUserIdentity().user;
    if(this.currentUser){
      this.rootPage = DashboardComponent;
    }
  }

  // openPage(page) {
  //   // close the menu when clicking a link from the menu
  //   this.menu.close();
  //   // navigate to the new page if it is not the current page
  //   this.nav.setRoot(page.component);
  // }
}
