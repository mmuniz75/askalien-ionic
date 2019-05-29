import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { IQuestion } from '../model/question';
import { IAnswer } from '../model/answer';

import { Observable } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { IServer } from '../model/server';
import { SERVER_CONF } from './consts';

@Injectable()
export class AskService {

      constructor(private http: HttpClient) { }

      ask(keyword: String): Observable<IQuestion[]> {
            const askUrl = 'http://' + environment.SERVER_URL + '/ask?question=';

            return this.http.get<IQuestion[]>(askUrl + keyword)
                  .pipe(
                        catchError(this.handleError)
                  )
      }


      getAnswer(id: number, search: string): Observable<IAnswer> {
            const anwerUrl = 'http://' + environment.SERVER_URL + '/answer/';
            return this.http.get<IAnswer>(anwerUrl + "/" + id + "?question=" + search)
                  .pipe(
                      catchError(this.handleError)
                  );
      }


      public configServer() {
            return this.http.get(SERVER_CONF)
                  .pipe(
                        map( (response: Response) => <IServer>response.json()),
                        catchError(this.handleError)
                  );
     }

      sendFeedBack(questionId: number, name: string, email: string, comments: string): Observable<any> {
            const feedBackUrl = 'http://' + environment.SERVER_URL + '/feedback';
            let data = new Comment();
            data.id = questionId;
            data.creator = name.toString();
            data.email = email.toString();
            data.feedback = comments.toString();

            let options = {
                  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
            };

            return this.http.post(feedBackUrl, JSON.stringify(data), options)
                  .pipe(
                        catchError(this.handleError)
                  );

      }

      private handleError(error: any) {
            console.error(error);
            return Observable.throw(error.message || 'Server error');
      }
}

export class Comment {
      id: number;
      email: string;
      creator: string;
      feedback: string;
}
