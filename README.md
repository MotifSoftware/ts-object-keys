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

It overrides the typescript inferrence for `Object.keys` method return type. It will provide the proper type returns (that will work as keys of the original object), and still extend a `string[]` type, where numbers have been converted to `` `${number}` ``, symbols are ignored, and builtin keys are omitted.

```typescript
const obj = { foo: 'bar', spam: ['eggs'] };
const objKeys = Object.keys(obj);

type OK = typeof objKeys; // -> ("foo" | "spam")[];

const record: Record<string, number> = {};

for (const k of objKeys) record[k] = Date.now(); // No TS complaints because keys extends string[]

const arr = ['foo', 'bar'];
const arrKeys = Object.keys(readonlyArr);

type AK = typeof arrKeys; // -> `${number}`[];

const readonlyArr = ['foo', 'bar'] as const;
const readonlyArrKeys = Object.keys(readonlyArr);

type ROAK = typeof readonlyArrKeys; // -> ("0" | "1")[]
```

The typedefs will also provide the global type of `ObjectKeys<T>` which is effectively the same as the return type of `Object.keys`.

## Caveats

If you extend a builtin object (other than Object or Array) with enumerable properties, you will not get inferrence for those keys. Example:

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
