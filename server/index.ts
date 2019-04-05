import 'reflect-metadata'
require('dotenv').config()

import Koa, { Context } from 'koa'
import { useKoaServer, useContainer } from 'routing-controllers'
import { Container } from 'typedi'

import * as controllers from './controllers'
import * as entities from './entities'

export const useMiddlewares = <T extends Koa>(app: T): T => {
  const errHandling = async (ctx: Context, next: any) => {
    try {
      await next();
    } catch (err) {
      console.log('go error', err)
      err.status = err.statusCode || err.status || 500;
      ctx.body = err.message;
      ctx.app.emit('error', err, ctx);
    }
  }
  app.use(errHandling)
  return app
}


export const createServer = async (): Promise<Koa> => {
  const koa: Koa = new Koa()

  const app: Koa = useKoaServer<Koa>(koa, {
    controllers: [controllers.ArticleController, controllers.MetaController, controllers.ImageController]
  })

  useContainer(Container)

  return useMiddlewares(app)
}

createServer().then(app => {
  app.listen(3000, () => {
    console.log(`start server successfully`)
  })
})
