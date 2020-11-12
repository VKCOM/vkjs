export type Dictionary<T> = { [key: string]: T };

export type AnyFunction = (...args: any[]) => any;

export type Writeable<T> = { -readonly [P in keyof T]: T[P] };
