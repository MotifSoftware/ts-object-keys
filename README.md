# @motifsoftware/ts-object-keys

TypeScript type declarations for Object.keys that produces better type inference.

## Installation

Add the following to your .npmrc file:

`motifsoftware:registry=https://npm.pkg.github.com`

Then you can use:

`$ npm i --save-dev @motifsoftware/ts-object-keys`

Finally, add it to your project's main type definitions file (e.g., `next-env.d.ts`, `index.d.ts`, etc.):

`/// <reference types="@motifsoftware/ts-object-keys" />`

## What does it do?

It overrides the typescript inferrence for `Object.keys` method return type. It will provide the proper type returns (that will work as keys of the original object), and still extend a `string[]` type, where numbers have been converted to `${number}`, symbols are ignored, and builtin keys are omitted.

## Caveats

If you extend a builtin object (other than Object.prototype or Array.prototype) with enumerable properties, you will not get inferrence for those keys. Example:

```typescript
class MyNumber extends Number {
  foo = 'bar';
}

const myNum = new MyNumber(10);

const keys = Object.keys(myNum);
// -> ["foo"]
type K = typeof keys;
// -> []
```

But since that's a really, REALLY dumb thing to do, you shouldn't ever run into that issue.

### That's it. Enjoy.
