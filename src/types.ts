export type Dictionary<T> = { [key: string]: T };

export type AnyFunction = (...args: any[]) => any;

export type SupportEvent<T extends keyof GlobalEventHandlersEventMap> = {
  supported: boolean;
  name: T;
};

export type TimeoutHandle = number | undefined;

export type Writeable<T> = { -readonly [P in keyof T]: T[P] };
