import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('f') form: NgForm;

  constructor(private router: Router) {}
  
  
  onClose(){
    if(navigator && navigator['app'])
      navigator['app'].exitApp();
  }

  onSearch(){
    this.router.navigateByUrl('/questions/' + this.form.value['question']);
  }
}
