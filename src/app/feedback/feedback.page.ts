import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AskService } from '../shared/ask.service';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit, OnDestroy {
  @ViewChild('f') form: NgForm;
  questionId:Number;
  private serviceSubscription: Subscription;
  
  constructor(private location: Location,
              private askService: AskService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
                                                this.questionId = +paramMap.get('questionId');
                                              }
                                  )
  }

  sendFeedBack(){
    const name = this.form.value["name"];
    const email = this.form.value["email"];
    const comment = this.form.value["comment"];
    
    this.serviceSubscription = this.askService.sendFeedBack(this.questionId,name,email,comment)
    .subscribe(response =>
            this.location.back()
    );
 
  }

  ngOnDestroy(){
    if(this.serviceSubscription)
      this.serviceSubscription.unsubscribe();
  }

}
