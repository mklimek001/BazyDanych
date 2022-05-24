import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './models';

@Injectable({
  providedIn: 'root'
})
export class LoggedUserService {
  current_user: BehaviorSubject<User> = new BehaviorSubject<User>(new User());

  constructor() { }

  setCurrentUser(user : User){
    this.current_user.next(user);
  }
}
