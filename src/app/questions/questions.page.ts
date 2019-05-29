import { Component, OnInit } from '@angular/core';
import { AskService } from '../shared/ask.service';
import { IQuestion } from '../model/question';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.page.html',
  styleUrls: ['./questions.page.scss'],
})
export class QuestionsPage implements OnInit {

  questions:IQuestion[];

  constructor(private askService: AskService,
              private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.paramMap.subscribe(paramMap => {
         const question = paramMap.get('question');

         this.askService.ask(question)
                        .subscribe(questions => this.questions=questions);
      }
    )  

  }

}  
