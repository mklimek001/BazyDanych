export class Article{
  article_id: Number;
  title: String;
  tags: String[];
  category: String;
  content: String;
  image_source: String;

  n_of_grades: Number;
  sum_of_grades: Number;
  n_of_views: Number;

  date_added: Date;
  date_updated: Date;

  constructor(){
    this.article_id = 0;
    this.title = '';
    this.tags = [];
    this.category = '';
    this.content = '';
    this.image_source = '';
    this.n_of_grades = 0;
    this.sum_of_grades = 0;
    this.n_of_views = 0;
    this.date_added = new Date();
    this.date_updated = new Date();
  }
}

export interface ArticlesData{
  "_order": Number,
  "_page": Number,
  "_per_page": Number,
  "_sort": String,
  "article_count": Number,
  "articles": Article[];
}

export interface Articles{
  articles: Article[]
}

export interface Categories{
  categories: String[]
}
export interface Tags{
  tags: String[]
}

export class View{
  article_id: Number;
  n_view: Number;

  constructor(){
    this.article_id = 0;
    this.n_view = 0;
  }
}

export class Rating{
  article_id: Number;
  grade: Number;

  constructor(){
    this.article_id = 0;
    this.grade = 0;
  }
}

export class User{
  id?: String;
  user_id: Number;
  name: String;

  login: String;
  password?: String;
  password1?: String;
  password2?: String;

  ratings: Rating[];
  views: View[];

  constructor(
    id = 0,
    name = '',
    login = '',
    ratings = [],
    views = [], ){
      this.user_id = id;
      this.name = name;
      this.login = login;
      this.ratings = ratings;
      this.views = views;
  }
}

export interface AuthRespone{
  message: String,
  user?: User
}

export interface LinksUsers{
    links: String[],
    users: User[]
}

export class Comment{
  comment_id: Number;
  user_id: Number;
  article_id: Number;
  content: String;

  constructor(){
    this.comment_id = 0;
    this.user_id = 0;
    this.article_id = 0;
    this.content = '';
  }
}

export interface Comments{
  comments: Comment[]
}

export enum ArticlesBy{
  tag = "tag",
  category = "category"
}

export class CheckboxDetails{
  value: String;
  isChecked: Boolean;

  constructor(value : String, checked : Boolean = false) {
    this.value = value;
    this.isChecked = checked;
  }
}
