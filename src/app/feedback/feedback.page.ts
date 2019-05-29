import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {
  @ViewChild('f') form: NgForm;
  
  constructor(private router:Router) { }

  ngOnInit() {
  }

  sendFeedBack(){
    this.router.navigateByUrl('/questions');
  }

}
