import { JsonController, Param, Body, Get, Post, Put, Delete } from 'routing-controllers';

@JsonController("/api")
export class MetaController {

  @Get("/meta")
  getMeta() {
    return 'meta'
  }
}
