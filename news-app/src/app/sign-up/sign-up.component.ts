import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppModule } from '../app.module';
import { LoggedUserService } from '../services/logged-user.service';
import { User } from '../services/models';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  user = new User();
  message : String = '';

  constructor(
    private userService : UserService,
     private router : Router,
     private loggedUserService : LoggedUserService) { }

  ngOnInit(): void {
  }

  signUp(){
    console.log(this.user);
    this.userService.signUp(this.user).subscribe(res => {
      this.message = res.message;
      console.log(this.user);
      console.log(res.user);
      if(res.user != undefined){
        this.loggedUserService.setCurrentUser(res.user);
        this.router.navigate(['/main-site']);
      }
    })
  }
}
