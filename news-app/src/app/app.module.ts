import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http'
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainSiteComponent } from './main-site/main-site.component';
import { AddArticleFormComponent } from './add-article-form/add-article-form.component';
import { LogInComponent } from './log-in/log-in.component';
import { ArticleComponent } from './article/article.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TopComponent } from './top/top.component';
import { AddCommentFormComponent } from './add-comment-form/add-comment-form.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ArticlesSectionComponent } from './articles-section/articles-section.component';
import { AddRatingFormComponent } from './add-rating-form/add-rating-form.component';


@NgModule({
  declarations: [
    AppComponent,
    MainSiteComponent,
    AddArticleFormComponent,
    LogInComponent,
    ArticleComponent,
    PageNotFoundComponent,
    TopComponent,
    AddCommentFormComponent,
    SignUpComponent,
    ArticlesSectionComponent,
    AddRatingFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
 }
