import { expect } from 'chai';
import { walk } from '..'
import * as npath from 'path'

describe('article test', () => {
  it('walk should work correctly', () => {
    walk(npath.resolve(__dirname, '../..'), async (file, isDir)=>{
      console.log('file: ', file, isDir)
    }).catch(console.log)
  });

})
