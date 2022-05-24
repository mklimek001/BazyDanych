import { Component, Input, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-add-rating-form',
  templateUrl: './add-rating-form.component.html',
  styleUrls: ['./add-rating-form.component.css']
})
export class AddRatingFormComponent implements OnInit {
  @Input() article_id !: Number;
  grade : Number = 0;
  grades = [1, 2, 3, 4, 5];

  constructor(private articleService : ArticleService) { }

  ngOnInit(): void {
  }

  rate(){
    this.articleService.rate(this.article_id, this.grade).subscribe(data => {});
  }
}
