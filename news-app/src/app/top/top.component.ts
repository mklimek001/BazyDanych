import { Component, Input, OnInit } from '@angular/core';
import { LoggedUserService } from '../services/logged-user.service';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css']
})
export class TopComponent implements OnInit {
  @Input() showLogin : Boolean = true;
  name : String = '';

  constructor(
    private loggedUserService : LoggedUserService
  ) {
    this.loggedUserService.current_user.subscribe(user => {
      this.name = user.name;
    })
   }

  ngOnInit(): void {
  }
  button(){
    console.log(this.name);
  }
}
