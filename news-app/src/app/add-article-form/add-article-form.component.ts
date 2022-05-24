import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { Article, CheckboxDetails } from '../services/models';

@Component({
  selector: 'app-add-article-form',
  templateUrl: './add-article-form.component.html',
  styleUrls: ['./add-article-form.component.css']
})
export class AddArticleFormComponent implements OnInit {
  article = new Article();
  tags : String[] = [];
  checkboxes : CheckboxDetails[] = [];
  constructor(private articleService : ArticleService) { }

  ngOnInit(): void {
    this.articleService.getTags().subscribe(data => {
      this.checkboxes = [];
      for (const tag of data.tags) {
        this.checkboxes.push(new CheckboxDetails(tag, false));
      }
    });
  }

  addArticle(){
    for (const checkbox of this.checkboxes) {
      if(checkbox.isChecked){
        this.article.tags.push(checkbox.value);
      }
    }
    console.log(this.article);
    this.articleService.publishAritcle(this.article);
  }

}
