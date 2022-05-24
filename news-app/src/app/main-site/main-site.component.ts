import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Article} from '../services/models';
import {ArticleService} from '../services//article.service'
import { LoggedUserService } from '../services/logged-user.service';

@Component({
  selector: 'app-main-site',
  templateUrl: './main-site.component.html',
  styleUrls: ['./main-site.component.css']
})
export class MainSiteComponent implements OnInit {
  recommended: Article[] = [];
  recent : Article[] = [];
  categories : String[] = [];
  tags : String[] = [];

  userLoggedIn !: Boolean;
  name : String = '';
  constructor(
    private articleProvider : ArticleService,
    private http : HttpClient,
    private loggedUserService : LoggedUserService) {
      this.loggedUserService.current_user.subscribe(user =>{
        this.userLoggedIn = user.login !== '';
        this.name = user.name;
      })
   }

  ngOnInit(): void {
    this.articleProvider.getArticles().subscribe(data =>{
      this.recent = data.articles.slice(0, 3);
    } );

    this.articleProvider.getArticles().subscribe(data =>{
      this.recommended = data.articles.slice(0, 3);
    } );

    this.articleProvider.getCategories().subscribe(data =>{
      this.categories = data.categories;
    } );

    this.articleProvider.getTags().subscribe(data =>{
      this.tags = data.tags;
    } );
  }

}
