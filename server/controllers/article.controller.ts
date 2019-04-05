import { JsonController, Param, Body, Get, Post, Put, Delete } from 'routing-controllers';
import { Articles } from '../entities'
import { omit } from '../utils';

@JsonController("/api")
export class ArticleController {
  constructor(private articlesService: Articles){

  }

  @Get("/articles")
  async getAll() {
    await this.articlesService.loadArticles()
    let articles = await this.articlesService.sortByCreated()
    return articles.map(a=> omit(['path', 'rawContent', 'metaContent'], a))
  }

  @Get("/articles/:slug")
  async getArticle(@Param('slug') slug: string) {
    let article = await this.articlesService.findArticleBySlug(slug)
    return article.map(a=> omit(['path', 'metaContent'], a)).getOrElse(null)
  }
}
