import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AskService } from '../shared/ask.service';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { LoadingController, AlertController } from '@ionic/angular';
import { presentDataError, presentAlert } from '../shared/consts';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit, OnDestroy {
  @ViewChild('f') form: NgForm;
  questionId: number;
  private serviceSubscription: Subscription;

  constructor(private location: Location,
              private askService: AskService,
              private route: ActivatedRoute,
              private loadingCtrl: LoadingController,
              private alertController: AlertController) { }

  ngOnInit() {
    this.route.paramMap
    .subscribe(paramMap => {this.questionId = +paramMap.get('questionId'); });
  }

  sendFeedBack() {
    const name = this.form.value.name;
    const email = this.form.value.email;
    const comment = this.form.value.comment;

    this.loadingCtrl
              .create({
                message: 'Sending feed back...'
              })
              .then(loadingEl => {
                loadingEl.present();

                this.serviceSubscription = this.askService.sendFeedBack(this.questionId, name, email, comment)
                .subscribe(response => {
                        loadingEl.dismiss();
                        presentAlert(this.alertController, 'Feed back sent', 'Thank\'s for answer that.');
                        this.location.back();

                }
                , error => {
                  loadingEl.dismiss();
                  presentDataError(this.alertController);
                });
              });

  }

  ngOnDestroy() {
    if (this.serviceSubscription) {
      this.serviceSubscription.unsubscribe();
    }
  }

}
