import * as nodeUtil from 'util'
import * as fs from 'fs'
import * as npath from 'path'

export const readFilePr = nodeUtil.promisify(fs.readFile)
export const readdirPr = nodeUtil.promisify(fs.readdir)
export const statPr = nodeUtil.promisify(fs.stat)


export async function walk(path: string, cb: (path: string, isDir: boolean)=>Promise<boolean|void>){
  for (let subpath of await readdirPr(path)){
    let fullpath = npath.join(path, subpath)
    let stat = await statPr(fullpath)
    let isBreak = await cb(fullpath, stat.isDirectory())
    if (!isBreak && stat.isDirectory()){
      await walk(fullpath, cb)
    }
  }
}

export function omit(omitKeys: string[], obj: any) {
  let objKeys = Object.keys(obj).filter(key => omitKeys.indexOf(key) === -1)
  return objKeys.reduce((p: any, c) => {
    p[c] = Object.seal(obj[c])
    return p
  }, {})
}

