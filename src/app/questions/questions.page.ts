import { Component, OnInit, OnDestroy } from '@angular/core';
import { AskService } from '../shared/ask.service';
import { IQuestion } from '../model/question';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoadingController, AlertController } from '@ionic/angular';
import { presentAlert, presentDataError } from '../shared/consts';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.page.html',
  styleUrls: ['./questions.page.scss'],
})
export class QuestionsPage implements OnInit, OnDestroy {

  questions: IQuestion[];
  searchText: string;
  private serviceSubscription: Subscription;

  constructor(private router: Router,
              private askService: AskService,
              private route: ActivatedRoute,
              private loadingCtrl: LoadingController,
              private alertController: AlertController) { }

  ngOnInit() {

    this.route.paramMap.subscribe(paramMap => {
         this.searchText = paramMap.get('question');

         if (!this.questions) {

          this.loadingCtrl
          .create({
            message: 'Seaching questions...'
          })
          .then(loadingEl => {
            loadingEl.present();
            this.serviceSubscription = this.askService.ask(this.searchText)
            .subscribe(questions => {
                loadingEl.dismiss();
                if (!questions || questions.length === 0) {
                  presentAlert(this.alertController, 'No questions found', null);
                  this.router.navigateByUrl('/home');
                } else {
                  this.questions = questions;
                }
            },
            error => {
                loadingEl.dismiss();
                presentDataError(this.alertController);
                this.router.navigateByUrl('/home');
              }
            );
          });
         }
      }
    );

  }

  ngOnDestroy() {
    if (this.serviceSubscription) {
      this.serviceSubscription.unsubscribe();
    }
  }

}
