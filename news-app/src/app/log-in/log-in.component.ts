import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppModule } from '../app.module'
import { User } from '../services/models';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  user = new User();
  currentuser = AppModule.current_user;
  message : String = '';

  loginError : Boolean = false;

  constructor(private userService : UserService, private router : Router) { }

  ngOnInit(): void {
  }

  logIn(){
    this.userService.logIn(this.user).subscribe(res => {
      this.message = res.message;
      if(res.user != undefined){
        this.currentuser = res.user;
        this.router.navigate(['/main-site']);
      }
      else{
        this.loginError = true;
      }
    })
  }
}
