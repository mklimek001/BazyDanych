import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Article, Articles, ArticlesData, Categories, Tags } from './models';

@Injectable({
  providedIn: 'root'
})

export class ArticleService {
  private articlesUrl = 'http://127.0.0.1:5001/articles/';

  private  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };

  constructor(
    private http: HttpClient
  ) { }

  getArticles() : Observable<ArticlesData> {
    return this.http.get<ArticlesData>(this.articlesUrl);
  }

  getRecommendedArticles(user_id : String) : Observable<Articles>{
    return this.http.get<Articles>(this.articlesUrl + 'recommended/' + user_id);
  }

  getArticlesByCategory(category : String) : Observable<Articles>{
    console.log(category);
    return this.http.get<Articles>(this.articlesUrl+'category/'+category);
  }

  getArticlesByTag(tag : String) : Observable<Articles>{
    return this.http.get<Articles>(this.articlesUrl + 'tag/' + tag);
  }

  getArticleById(id : String) : Observable<Article>{
    return this.http.get<Article>(this.articlesUrl + id);
  }

  getCategories() : Observable<Categories>{
    return this.http.get<Categories>(this.articlesUrl + "categories");
  }

  getTags() : Observable<Tags>{
    return this.http.get<Tags>(this.articlesUrl + "tags");
  }

  publishAritcle(article : Article){
    this.http.post<Article>(this.articlesUrl, article, this.httpOptions);
  }

  deleteArticle(id : Number){
    this.http.delete(this.articlesUrl + id.toString());
  }

  rate(article_id : Number, grade : Number){
    return this.http.put<Number>(this.articlesUrl + article_id.toString() + "/" + grade.toString(), grade, this.httpOptions);
  }
}


