import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router) {}
  
  
  onClose(){
    if(navigator && navigator['app'])
      navigator['app'].exitApp();
  }

  onSearch(){
    this.router.navigateByUrl('/questions');
  }
}
