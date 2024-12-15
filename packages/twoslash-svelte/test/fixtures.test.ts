/// <reference types="vite/client" />

import type { TwoslashReturn } from 'twoslash'
import { extname } from 'node:path'
import process from 'node:process'
import { expect, it } from 'vitest'
import { createTwoslasher } from '../src/index'

// To add a test, create a file in the fixtures folder and it will will run through
// as though it was the codeblock.

const fixtures = import.meta.glob('./fixtures/**/*.*', { as: 'raw' })

// A temporary list of regex to match with the path of the file to test
const filters: RegExp[] = [
  // /completions-files/,
]

if (process.env.CI && filters.length)
  throw new Error('Should not filters fixture tests in CI, did you forget to remove them?')

const twoslasher = createTwoslasher()

Object.entries(fixtures).forEach(([path, fixture]) => {
  path = path.replace(/\\/g, '/')
  const expectThrows = path.includes('/throws/')
  const inExt = extname(path).slice(1)
  const outExt = expectThrows ? '.txt' : '.json'
  const outPath = path.replace('/fixtures/', '/results/').replace(/\.[^/.]+$/, outExt)

  it.skipIf(filters.length && !filters.some(f => path.match(f)))(
    path,
    async () => {
      let result: TwoslashReturn = undefined!
      try {
        result = twoslasher(
          await fixture(),
          inExt,
          {
            customTags: ['annotate'],
          },
        )
      }
      catch (err: any) {
        if (expectThrows) {
          expect(err.message).toMatchFileSnapshot(outPath)
          return
        }
        else {
          throw err
        }
      }

      if (expectThrows) {
        throw new Error('Expected to throw')
      }
      else {
        expect(cleanFixture(result))
          .toMatchFileSnapshot(outPath)
      }
    },
  )
})

function cleanFixture(result: TwoslashReturn) {
  return JSON.stringify({
    code: result.code,
    nodes: result.nodes,
    flags: result.meta.flagNotations,
    // compilerOptions: ts.meta.compilerOptions
  }, null, 2).replaceAll(process.cwd(), '[home]')
}
