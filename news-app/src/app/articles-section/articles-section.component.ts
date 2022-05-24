import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { ArticleService } from '../services/article.service';
import { Article, ArticlesBy } from '../services/models';

@Component({
  selector: 'app-articles-section',
  templateUrl: './articles-section.component.html',
  styleUrls: ['./articles-section.component.css']
})
export class ArticlesSectionComponent implements OnInit {

  articles : Article[] = [];

  constructor(private articleService : ArticleService, private route : ActivatedRoute) { }

  ngOnInit(): void {
    let obs = this.route.paramMap.pipe(switchMap(params => {
      let choose_by = (params.get('choose_by'));
      let name = String(params.get('name'));
      console.log(choose_by, name);
      switch (choose_by) {
      case 'tag':
        return this.articleService.getArticlesByTag(name);
      default:
        return this.articleService.getArticlesByCategory(name);
     }
    }))
    obs.subscribe(articles => this.articles = articles.articles);
  }
}
