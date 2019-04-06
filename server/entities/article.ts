
import { readFilePr, omit, slugify } from '../utils'
import { Either, Left, Right, Option, None, Some } from 'funfix-core'
const YAML = require('yaml')


export class Article {
  up(up: any) {
    throw new Error("Method not implemented.");
  }
  public title: string
  public created: Date
  public updated: Date
  public tags: string[] = []
  public slug: string
  public rawContent: string
  public metaContent: string = ''

  constructor(
    public path: string,
  ) {
  }

  async loadContent(): Promise<[string, string]> {
    if (this.rawContent){
      return [this.metaContent, this.rawContent]
    }
    let fileContent = await readFilePr(this.path, { encoding: 'utf8' })
    let [meta, content] = splitMarkdown(fileContent)
    this.rawContent = content
    this.metaContent = meta
    return [meta, content]
  }


  async loadMetaDataInto(meta: string) {
    let m = YAML.parse(meta)

    this.title = m.title
    this.slug = slugify(this.title)
    if (m.created){
      //exception could throw on .get
      this.created = parseDateStr(m.created).get()
    } else {
      this.created = new Date(1970, 1, 1, 0, 0, 0)
    }

    this.updated = m.updated ? parseDateStr(m.updated).get() : this.created

    if (m.tags){
      this.tags = m.tags.split(',')
    }
  }

  // why json override is not working?
  toJSON() {
    console.log('toJSON: ', omit(['path'], this))
    return omit(['path'], this)
  }
}

export function parseDateStr(str: string): Either<Error, Date> {
  let dateReg = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/
  let match = str.match(dateReg)
  if (!match) return Left(new Error(`invalid date string: ${str}`))
  else {
    let result = new Date(+match[1], (+match[2]) - 1,  +match[3], +match[4], +match[5], +match[6])
    return Right(result)
  }
}



export function splitMarkdown(content: string): [string, string] {
  // https://stackoverflow.com/questions/1979884/how-to-use-javascript-regex-over-multiple-lines
  let reg = /=+([^=]*)=+([\s\S]*)/
  let match = content.match(reg)
  if (match && match.length === 3) { // with meta & content
    return [match[1].trim(), match[2].trim()]
  } else {
    return ['', content]
  }
}

export async function parseArticle(path: string): Promise<Option<Article>>{
  let article = new Article(path)
  let [meta] = await article.loadContent()
  if (!meta) return None
  else {
    await article.loadMetaDataInto(meta)
    if (!article.title) return None
    return Some(article)
  }
}
