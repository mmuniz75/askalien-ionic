import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';

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

      constructor(private _http: Http) { }

      ask(keyword: String): Observable<IQuestion[]> {
            const askUrl = 'http://' + environment.SERVER_URL + '/ask?question=';
            let headers = new Headers({ 'Authorization': 'Basic ' + btoa('admin:456') });
            let options = new RequestOptions({ headers: headers, method: "get" });

            return this._http.get(askUrl + keyword)
                  .pipe(
                        map((response: Response) => <IQuestion[]>response.json()),
                        catchError(this.handleError)
                  )
      }


      getAnswer(id: number, search: string): Observable<IAnswer> {
            const anwerUrl = 'http://' + environment.SERVER_URL + '/answer/';
            return this._http.get(anwerUrl + "/" + id + "?question=" + search)
                  .pipe(
                      map((response: Response) => <IAnswer>response.json()),
                      catchError(this.handleError)
                  );
      }


      public configServer() {
            return this._http.get(SERVER_CONF)
                  .pipe(
                        map( (response: Response) => <IServer>response.json()),
                        catchError(this.handleError)
                  );
     }

      sendFeedBack(questionId: number, name: string, email: string, comments: string): Observable<any> {
            const feedBackUrl = 'http://' + environment.SERVER_URL + '/feedback';
            let headers = new Headers({ 'Content-Type': 'application/json' });
            let options = new RequestOptions({ headers: headers, method: "post" });
            let data = new Comment();
            data.id = questionId;
            data.creator = name.toString();
            data.email = email.toString();
            data.feedback = comments.toString();

            return this._http.post(feedBackUrl, JSON.stringify(data), options)
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
