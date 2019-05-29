import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AskService } from '../shared/ask.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  implements OnInit, OnDestroy{
  @ViewChild('f') form: NgForm;
  private serviceSubscription: Subscription;

  constructor(private router: Router,
              private askService: AskService) {}
  
  
  onClose(){
    if(navigator && navigator['app'])
      navigator['app'].exitApp();
  }

  onSearch(){
    this.router.navigateByUrl('/questions/' + this.form.value['question']);
  }

  ngOnInit() {
    if(environment.production) {
      this.serviceSubscription = this.askService.configServer()
                                  .subscribe(server => 
                                    environment.SERVER_URL = server.server
                                  );
    }
  }

  ngOnDestroy() {
    if (this.serviceSubscription) {
      this.serviceSubscription.unsubscribe();
    }
  }

  
}
