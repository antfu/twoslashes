import ts from 'typescript'
import type { TwoslashOptions } from './core.js'
import { createTwoslasher as _createTwoslasher, twoslasher as _twoslasher } from './core.js'
import { convertLegacyOptions, convertLegacyReturn } from './legacy.js'
import type { TwoslashOptionsLegacy, TwoslashReturnLegacy } from './legacy.js'

export * from './public.js'
export * from './legacy.js'

// eslint-disable-next-line node/prefer-global/process
const cwd = /* @__PURE__ */ typeof process !== 'undefined' && typeof process.cwd === 'function' ? process.cwd() : ''

/**
 * Create a Twoslash instance with cached TS environments
 */
export function createTwoslasher(opts?: TwoslashOptions) {
  return _createTwoslasher({
    vfsRoot: cwd,
    tsModule: ts,
    ...opts,
  })
}

/**
 * Get type results from a code sample
 */
export function twoslasher(code: string, lang: string, opts?: TwoslashOptions) {
  return _twoslasher(code, lang, {
    vfsRoot: cwd,
    tsModule: ts,
    ...opts,
  })
}

/**
 * Compatability wrapper to align with `@typescript/twoslash`'s input/output
 *
 * @deprecated migrate to `twoslasher` instead
 */
export function twoslasherLegacy(code: string, lang: string, opts?: TwoslashOptionsLegacy): TwoslashReturnLegacy {
  return convertLegacyReturn(
    _twoslasher(code, lang, convertLegacyOptions({
      vfsRoot: cwd,
      tsModule: ts,
      ...opts,
    })),
  )
}
