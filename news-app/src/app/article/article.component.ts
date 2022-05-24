import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { ArticleService } from '../services/article.service';
import { CommentService } from '../services/comment.service';
import { LoggedUserService } from '../services/logged-user.service';
import { Article, Comment } from '../services/models';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  article : Article = new Article();
  comments : Comment[] = [];
  commentsAvailable = false;
  userLoggedIn : Boolean = false;

  constructor(
    private route : ActivatedRoute,
    private articleService : ArticleService,
    private commentService : CommentService,
    private loggedUserService : LoggedUserService) {
      let obs1 = this.route.paramMap.pipe(
        switchMap(params =>{
          return this.articleService.getArticleById(params.get('id')!);
        }));
      let obs2 = this.route.paramMap.pipe(
        switchMap(params =>{
          return this.commentService.getCommentsForArticle(Number(params.get('id')!));
        }));

      obs1.subscribe(data => {
        this.article = data;
      })

      obs2.subscribe(data =>{
        this.comments = data.comments;
        if(this.comments.length > 0){
          this.commentsAvailable = true;
        }
      })

      loggedUserService.current_user.subscribe(user => {
        this.userLoggedIn = user.login !== '';
      })
     }

  ngOnInit(): void {
  }
}
