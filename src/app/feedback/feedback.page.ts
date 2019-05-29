import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AskService } from '../shared/ask.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {
  @ViewChild('f') form: NgForm;
  questionId:Number;
  
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
    
    this.askService.sendFeedBack(this.questionId,name,email,comment)
    .subscribe(response =>
            this.location.back()
    );
 
  }

}
