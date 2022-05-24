import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { Article } from '../services/models';

@Component({
  selector: 'app-add-article-form',
  templateUrl: './add-article-form.component.html',
  styleUrls: ['./add-article-form.component.css']
})
export class AddArticleFormComponent implements OnInit {
  article = new Article();
  tags : String[] = [];
  constructor(private articleService : ArticleService) { }

  ngOnInit(): void {
    this.articleService.getTags().subscribe(data => {
      this.tags = data.tags;
    });
  }

  addArticle(){
    this.articleService.publishAritcle(this.article);
  }

}
