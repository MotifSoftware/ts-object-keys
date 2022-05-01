type Keys<T, E = never> = {
  [k in keyof T]: k extends number ? `${k}` : k extends E | symbol ? never : k;
}[keyof T];

declare type ObjectKeys<T> = T extends readonly any[]
  ? Keys<T, keyof []>[]
  : T extends any[]
  ? Array<`${number}` | Keys<T, keyof []>>
  : T extends Number | Boolean | null | Map<any, any> | Set<any> | {}
  ? []
  : T extends
      | string
      | String
      | Buffer
      | Uint8Array
      | Uint16Array
      | Uint32Array
      | BigUint64Array
      | Int8Array
      | Int16Array
      | Int32Array
      | BigInt64Array
      | ArrayBuffer
  ? Array<`${number}`>
  : T extends Function | object
  ? Keys<T>[]
  : [];

declare interface ObjectConstructor {
  keys(): [];
  keys(
    obj:
      | null
      | undefined
      | number
      | boolean
      | Map<any, any>
      | Set<any>
      | Number
      | Boolean
  ): [];
  keys(
    obj:
      | string
      | String
      | Buffer
      | Uint8Array
      | Uint16Array
      | Uint32Array
      | BigUint64Array
      | Int8Array
      | Int16Array
      | Int32Array
      | BigInt64Array
      | ArrayBuffer
  ): Array<`${number}`>;
  keys<T extends readonly any[]>(obj: T): Keys<T, keyof []>[];
  keys<T extends any[]>(obj: T): Array<`${number}` | Keys<T, keyof []>>;
  keys<T extends Function | Record<symbol | number | string, any>>(
    obj: T
  ): Keys<T>[];
  keys<T>(obj?: T): ObjectKeys<T>;
}
