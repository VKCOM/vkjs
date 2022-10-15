import { escapeRegExp } from '../regexp';

export class Replacer {
  private regexp: RegExp | undefined;
  private map: Record<string, string>;

  constructor(map: Record<string, string>) {
    this.map = map;
  }

  private build() {
    if (this.regexp) {
      return;
    }

    const groups = Object.keys(this.map)
      .map(escapeRegExp)
      .sort((a, b) => b.length - a.length);
    const pattern = `(?:${groups.join('|')})`;

    this.regexp = new RegExp(pattern, 'g');
  }

  replace(string: string) {
    if (!string) {
      return '';
    }

    this.build();

    return string.replace(this.regexp!, (substring) => this.map[substring]);
  }
}
