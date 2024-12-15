# Twoslash Svelte

This package added the support for Twoslash to handle Svelte files.

For example:

```svelte twoslash
<script>
    import { onMount } from 'svelte'
    //       ^?

    // Reactive state.
    let count = $state(0)

    // Functions that mutate state and trigger updates.
    function increment() {
        count++
    }

    // Lifecycle hooks.
    onMount(() => {
        console.log(`The initial count is ${count}.`)
    })
</script>

<button onclick={increment}>
    Count is: {count}
</button>
```

## Installation

::: code-group

```bash [npm]
npm i -D twoslash-svelte svelte2tsx
```
```bash [pnpm]
pnpm i -D twoslash-svelte svelte2tsx
```
```bash [yarn]
yarn add -D twoslash-svelte svelte2tsx
```
```bash [bun]
bun add -D twoslash-svelte svelte2tsx
```

:::

::: info Required Types

`twoslash-svelte` requires `svelte2tsx` to be installed so that required declaration files are present during compilation of the Svelte code. Without `svelte2tsx` installed you might see errors like: `Cannot find name 'svelteHTML'.`

:::

## Usage

```ts twoslash
// @noErrors
import { createTwoslasher } from 'twoslash' // [!code --]
import { createTwoslasher } from 'twoslash-svelte' // [!code ++]

const code = `
<script>
  const msg = 'Hello Svelte!'
</script>

<div>
<h1>{msg}</h1>
</div>
`

const twoslasher = createTwoslasher()
const result = twoslasher(code, 'svelte') // [!code hl]
```
