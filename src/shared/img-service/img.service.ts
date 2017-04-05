import { Injectable }    from '@angular/core';


@Injectable()
export class ImgService  {
  default_image: any = 'assets/img/ionic.png' ;

  constructor(


  ) { }

  updateUrl(avatar:any){
    if(avatar){
      avatar.imageThumbUrl = this.default_image;
    }
  };
}


