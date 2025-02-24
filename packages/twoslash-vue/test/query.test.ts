import { describe, expect, it } from 'vitest'
import { createTwoslasher } from '../src/index'

const code = await import('./fixtures/query-basic.vue?raw').then(m => m.default)

const twoslasher = createTwoslasher()

describe('basic', () => {
  const result = twoslasher(code, 'vue')

  it('has correct hover types', () => {
    expect(result.nodes.find(n => n.type === 'hover' && n.target === 'button'))
      .toHaveProperty('text', '(property) button: ButtonHTMLAttributes & ReservedProps')
    expect(result.nodes.find(n => n.type === 'hover' && n.target === 'click'))
      .toHaveProperty('text', `(property) onClick?: ((payload: MouseEvent) => void) | undefined`)
  })

  it('has correct query', () => {
    expect(result.meta.positionQueries)
      .toMatchInlineSnapshot(`
        [
          93,
          161,
          863,
          1034,
        ]
      `)

    expect(result.nodes.find(n => n.type === 'query' && n.target === 'double'))
      .toHaveProperty('text', 'const double: ComputedRef<number>')

    expect(result.nodes.find(n => n.type === 'query' && n.target === 'computed'))
      .toMatchInlineSnapshot(`
        {
          "character": 14,
          "docs": undefined,
          "length": 8,
          "line": 1,
          "start": 39,
          "tags": undefined,
          "target": "computed",
          "text": "(alias) const computed: {
            <T>(getter: ComputedGetter<T>, debugOptions?: DebuggerOptions): ComputedRef<T>;
            <T, S = T>(options: WritableComputedOptions<T, S>, debugOptions?: DebuggerOptions): WritableComputedRef<T, S>;
        }
        import computed",
          "type": "query",
        }
      `)

    expect(result.nodes.find(n => n.type === 'query' && n.target === 'count'))
      .toMatchInlineSnapshot(`
        {
          "character": 18,
          "docs": undefined,
          "length": 5,
          "line": 9,
          "start": 228,
          "tags": undefined,
          "target": "count",
          "text": "(property) count: number",
          "type": "query",
        }
      `)

    expect(result.nodes.find(n => n.type === 'query' && n.target === 'click'))
      .toMatchInlineSnapshot(`
        {
          "character": 11,
          "docs": undefined,
          "length": 5,
          "line": 8,
          "start": 163,
          "tags": undefined,
          "target": "click",
          "text": "(property) onClick?: ((payload: MouseEvent) => void) | undefined",
          "type": "query",
        }
      `)
    expect(result.nodes.filter(n => n.type === 'query'))
      .toHaveLength(4)
  })
})
