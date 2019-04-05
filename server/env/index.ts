import * as npath from 'path'


let mdroot = process.env.MD_ROOT
if (!mdroot) throw new Error(`MD_ROOT configuration is required`)
export const MD_ROOT = npath.resolve(process.cwd(), mdroot) 
