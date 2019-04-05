import { Article, parseArticle} from "./article";
import { Option, None, Some } from 'funfix-core'
import { walk } from '../utils'
import { Service } from 'typedi'
import { MD_ROOT } from "../env";

export async function parseArticles(path: string): Promise<Article[]>{
  let articles:Article[] = []
  await walk(path, async (nodepath, isDir)=>{
    if (!isDir && nodepath.endsWith('.md')){
      let result = await parseArticle(nodepath)
      result.map((article)=>{
        articles.push(article)
      })
    }
  })
  return articles
}

function createArticles() {
  return new Articles(MD_ROOT)
}


@Service({
  factory: createArticles
})
export class Articles{
  articles: Option<Article[]> = None

  constructor(public path: string){
    
  }

  async loadArticles(path: string = this.path){
    if (this.articles.isEmpty()) {
      this.articles = Some(await parseArticles(path))
    }
    return this.articles.get()
  }
  
  async sortByCreated(){
    let articles = await this.loadArticles()
    return articles.sort((a, b)=>{
      return b.updated.getTime() - a.updated.getTime()
    })
  }

  async paginate(page: number, pageSize: number){
    let articles = await this.loadArticles()
    let start = (page - 1) * pageSize // js is safe to do a slice that exceeds the array boundary
    let limit = page * pageSize

    return {
      data: articles.slice(start, limit),
      total: articles.length
    }
  }

  async findArticleBySlug(slug: string){
    let articles = await this.loadArticles()
    let article = articles.find(article=> article.slug === slug)
    return Option.of(article)
  }
}


