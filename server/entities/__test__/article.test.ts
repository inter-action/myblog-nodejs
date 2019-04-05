import { expect } from 'chai';
import { splitMarkdown, Article, parseDateStr } from '../article'

describe('article test', () => {
  it('splitMarkdown should work correctly', () => {

    let fileContent = `
===
title: you dont know js
created: 2018-01-18 14:20:06
===

#title
    `
    let [meta, content] = splitMarkdown(fileContent)
    expect(meta).to.eq(`
title: you dont know js
created: 2018-01-18 14:20:06
    `.trim(), 'meta info failed')
    
    expect(content).to.eq('#title', 'title info failed' + content)
  });

  it('test override toJSON should work correctly', ()=>{
    //todo:
  })

  it('test parse date should work correctly', ()=>{
    let str = ' 2018-01-18 14:20:06 '
    let d = parseDateStr(str)
    expect(d.get().toLocaleString()).to.eq('1/18/2018, 2:20:06 PM')
  })
})
