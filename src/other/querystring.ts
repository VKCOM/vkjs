export interface ParsedQuery<T = string> {
  [key: string]: T | T[] | null;
}

function parse(input: string | any): ParsedQuery {
  if (typeof input !== 'string') {
    return {};
  }

  const query = input.trim().replace(/^[?#&]/, '');
  if (!query) {
    return {};
  }

  const str = query.substring(query.indexOf('?') + 1);

  return str.split('&').reduce((acc: ParsedQuery, item: string) => {
    const param = item.split('=');

    if (param[1]) {
      acc[decodeURIComponent(param[0])] = decodeURIComponent(param[1].replace(/\+/g, ' '));
    }

    return acc;
  }, {});
}

type StringifyQueryItem = string | boolean | number | null | undefined;

type StringifyQuery = Record<string, StringifyQueryItem | readonly StringifyQueryItem[]>;

interface StringifyOptions {
  /**
   * URL encode the keys and values
   *
   * @default true
   */
  encode?: boolean;

  /**
   * Skip keys with `null` as the value.
   * Keys with `undefined` as the value are always ignored.
   *
   * @default true
   */
  skipNull?: true;
}

function stringify(data: StringifyQuery, options: StringifyOptions = {}): string {
  if (typeof data !== 'object' || data === null) {
    return '';
  }

  options = {
    encode: true,
    ...options,
  };

  const encode = (value: any): string => {
    return options.encode ? encodeURIComponent(value) : String(value);
  };

  return Object.keys(data)
    .reduce<string[]>((acc, key) => {
      const value = data[key];

      if (value === undefined) {
        return acc;
      }

      if (value === null) {
        if (!options.skipNull) {
          acc.push([encode(key), ''].join('='));
        }

        return acc;
      }

      if (Array.isArray(value)) {
        value
          .map((arrayItem) => {
            acc.push(`${encode(key)}[]=${encode(arrayItem)}`);
          })
          .join();
        return acc;
      }

      acc.push([encode(key), encode(value)].join('='));
      return acc;
    }, [])
    .join('&');
}

export const querystring = {
  parse,
  stringify,
};
