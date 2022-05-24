import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

import { Comment, Comments } from './models'

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private commentsUrl = 'http://127.0.0.1:5001/comments/';

  private  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };

  constructor(private http : HttpClient) { }

  getCommentsForArticle(id : Number) : Observable<Comments>{
    return this.http.get<Comments>(this.commentsUrl + 'article/' + id.toString());
  }

  publishComment(comment : Comment) : Observable<Comment>{
    console.log(comment);
    return this.http.post<Comment>(this.commentsUrl, comment, this.httpOptions).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
