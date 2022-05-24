import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError, of } from 'rxjs';
import { AuthRespone, LinksUsers, User } from './models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl = 'http://127.0.0.1:5001/users';
  private loginUrl = 'http://127.0.0.1:5001/login';
  private signupUrl = 'http://127.0.0.1:5001/signup';

  private  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };

  constructor(private http:HttpClient) {

  }

  getUsers() : Observable<LinksUsers>{
    return this.http.get<LinksUsers>(this.usersUrl).pipe(catchError(this.handleError));
  }

  logIn(user : User) : Observable<AuthRespone>{
    return this.http.post<AuthRespone>(this.loginUrl, user, this.httpOptions).pipe(catchError(this.handleError));
  }

  signUp(user : User) : Observable<AuthRespone>{
    return this.http.post<AuthRespone>(this.signupUrl, user, this.httpOptions).pipe(catchError(this.handleError));
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
