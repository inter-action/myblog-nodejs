import { JsonController, Param, Body, Get, Post, Put, Delete } from 'routing-controllers';
import * as npath from 'path'
import { readFilePr } from '../utils'
import { MD_ROOT } from '../env'
const YAML = require('yaml')

let meta = null
@JsonController("/api")
export class MetaController {

  @Get("/meta")
  async getMeta() {
    //todo: add cache
    let c = await readFilePr(npath.join(MD_ROOT, 'meta.yaml'), {encoding: 'utf8'})
    return YAML.parse(c)
  }
}
