import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AskService } from '../shared/ask.service';
import { IAnswer } from '../model/answer';
import { Subscription } from 'rxjs';
import { LoadingController, AlertController } from '@ionic/angular';
import { presentDataError } from '../shared/consts';
import { Location } from '@angular/common';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.page.html',
  styleUrls: ['./answer.page.scss'],
})
export class AnswerPage implements OnInit, OnDestroy {
  answer: IAnswer;
  private serviceSubscription: Subscription;

  constructor(private router: Router,
              private askService: AskService,
              private route: ActivatedRoute,
              private loadingCtrl: LoadingController,
              private alertController: AlertController,
              private location: Location) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      const id = paramMap.get('id');
      const question = paramMap.get('question');

      if (!this.answer) {

        this.loadingCtrl
        .create({
          message: 'Loading answer...'
        })
        .then(loadingEl => {
          loadingEl.present();
          this.serviceSubscription = this.askService.getAnswer(+id, question)
                                                    .subscribe(answer => {
                                                                          loadingEl.dismiss();
                                                                          this.answer = answer;
                                                                        },
                                                                error => {
                                                                    loadingEl.dismiss();
                                                                    presentDataError(this.alertController);
                                                                    this.location.back();
                                                                  });
        });
       }
      }
    );
  }

  openFeedBack() {
    this.router.navigate(['/feedback', this.answer.questionId]);
  }

  ngOnDestroy() {
    if (this.serviceSubscription) {
      this.serviceSubscription.unsubscribe();
    }
  }

}
