import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { LoggedUserService } from '../services/logged-user.service';

import { User } from '../services/models';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  user = new User();
  message : String = '';
  logged : boolean = false;

  constructor(
    private userService : UserService,
    private router : Router,
    private loggedUserService : LoggedUserService) { }

  ngOnInit(): void {
  }

  logIn(){
    this.userService.logIn(this.user).subscribe(res => {
      this.message = res.message;
      console.log(this.message);
      if(res.user != undefined){
        this.loggedUserService.setCurrentUser(res.user);
        this.logged = true;
        this.router.navigate(['/main-site']);
      }
    })
  }
}
