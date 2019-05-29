import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AskService } from '../shared/ask.service';
import { IQuestion } from '../model/question';
import { IAnswer } from '../model/answer';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.page.html',
  styleUrls: ['./answer.page.scss'],
})
export class AnswerPage implements OnInit {
  answer : IAnswer;

  constructor(private router: Router,
              private askService: AskService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      const id = paramMap.get('id');
      const question = paramMap.get('question');

      this.askService.getAnswer(+id,question)
                     .subscribe(answer => this.answer=answer);
   }
 )  
  }

  openFeedBack(){
    this.router.navigateByUrl('/feedback');
  }

}
