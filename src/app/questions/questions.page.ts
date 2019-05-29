import { Component, OnInit, OnDestroy } from '@angular/core';
import { AskService } from '../shared/ask.service';
import { IQuestion } from '../model/question';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.page.html',
  styleUrls: ['./questions.page.scss'],
})
export class QuestionsPage implements OnInit, OnDestroy {

  questions:IQuestion[];
  searchText : String;
  private serviceSubscription: Subscription;

  constructor(private askService: AskService,
              private route: ActivatedRoute,
              private loadingCtrl: LoadingController) { }

  ngOnInit() {

    this.route.paramMap.subscribe(paramMap => {
         this.searchText = paramMap.get('question');

         if(!this.questions) {

          this.loadingCtrl
          .create({
            message: 'Seaching questions...'
          })
          .then(loadingEl => {
            loadingEl.present();
            this.serviceSubscription = this.askService.ask(this.searchText)
            .subscribe(questions => {
                loadingEl.dismiss();
                this.questions=questions
            });
          });
         }                 
      }
    )  

  }

  ngOnDestroy(){
    if(this.serviceSubscription)
      this.serviceSubscription.unsubscribe();
  }

}  
