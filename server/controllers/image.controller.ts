import * as fs from 'fs'
import * as path from 'path'
import { Controller, Get, Params, Ctx } from 'routing-controllers';
import { Context } from 'koa';

import { Articles } from '../entities'

@Controller()
export class ImageController {
  constructor(private articlesService: Articles){
  }

  @Get("/images/:slug/:image+")
  async getImage(@Params() params: any, @Ctx() ctx: Context) {
    let findItem = await this.articlesService.findArticleBySlug(params.slug)
    if (findItem.isEmpty()) {
      return ctx.status = 404
    }
    let article = findItem.get()
    let imageAbsPath = path.join(path.dirname(article.path), params.image)
    try {
      ctx.response.set("Content-Type", "image/*")
      ctx.body = fs.createReadStream(imageAbsPath)
      ctx.status = 200
    } catch (error){
      console.log('error: ', error)
      ctx.status = 404
    }
    // ctx object has to be returned for this to work
    return ctx
  }
}
