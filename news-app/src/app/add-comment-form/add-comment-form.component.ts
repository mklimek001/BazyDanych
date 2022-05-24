import { Component, Input, OnInit } from '@angular/core';
import {Comment } from '../services/models'
import { CommentService } from '../services/comment.service';
import { AppModule } from '../app.module';
import { UserService } from '../services/user.service';
import { LoggedUserService } from '../services/logged-user.service';

@Component({
  selector: 'app-add-comment-form',
  templateUrl: './add-comment-form.component.html',
  styleUrls: ['./add-comment-form.component.css']
})
export class AddCommentFormComponent implements OnInit {
  @Input() article_id !: Number;
  comment : Comment = new Comment;
  current_user_id !: Number;

  constructor(
    private commentService : CommentService,
    private loggedUserService : LoggedUserService) {
    loggedUserService.current_user.subscribe(user => {
      this.current_user_id = user.user_id;
    })

   }

  ngOnInit(): void {

  }

  publishComment(){
    this.comment.user_id =  this.current_user_id;
    this.comment.article_id = this.article_id;
    console.log(this.comment, this.article_id);
    this.commentService.publishComment(this.comment).subscribe(caoomet =>{});
  }
}
