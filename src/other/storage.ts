import { type Dictionary } from './types.ts';

class CustomStorage {
  private data: Dictionary<string> = {};

  public setItem(key: string, val: string) {
    this.data[key] = String(val);
  }

  public getItem = (key: string) => (this.data.hasOwnProperty(key) ? this.data[key] : null);

  public removeItem(id: string) {
    delete this.data[id];
  }

  public clear() {
    this.data = {};
  }

  public get length() {
    return Object.keys(this.data).length;
  }

  public key(index: number): string | null {
    return Object.keys(this.data)[index];
  }

  public keys = (): string[] => Object.keys(this.data);
}

const dummyKey = 'vk-ls-dummy';
const dummyContent = 'test';

let ls: CustomStorage | Storage;

function getLocalStorage() {
  if (ls) {
    return ls;
  }
  try {
    // Проверяем, нет ли в FF или Safari cross domain security restrictions
    window.localStorage.setItem(dummyKey, dummyContent);
    if (dummyContent !== window.localStorage.getItem(dummyKey)) {
      throw new Error('localStorage is broken');
    }
    window.localStorage.removeItem(dummyKey);
    ls = window.localStorage;
  } catch (e) {
    ls = new CustomStorage();
  }
  return ls;
}

/**
 * Обертка над localStorage для кода, который может использоваться на других сайтах
 * Firefox блокирует доступ к localStorage для скриптов с других доменов
 */
export const localStorage = {
  setItem: (key: string, val: string): void => getLocalStorage().setItem(key, val),
  getItem: (key: string): string | null => getLocalStorage().getItem(key),
  removeItem: (key: string): void => getLocalStorage().removeItem(key),
  clear: (): void => getLocalStorage().clear(),
  length: (): number => getLocalStorage().length,
  key: (index: number): string | null => getLocalStorage().key(index),
  keys(): string[] {
    const storage = getLocalStorage();
    if (storage instanceof CustomStorage) {
      return storage.keys();
    } else {
      return Object.keys(storage);
    }
  },
  getPrefixedKeys: (prefix: string): string[] => {
    return localStorage.keys().filter((key) => key.startsWith(prefix));
  },
};

let sessionStorageCache: CustomStorage | Storage;

function getSessionStorage() {
  if (sessionStorageCache) {
    return sessionStorageCache;
  }
  try {
    // Проверяем, нет ли в FF или Safari cross domain security restrictions
    window.sessionStorage.setItem(dummyKey, dummyContent);
    if (dummyContent !== window.sessionStorage.getItem(dummyKey)) {
      throw new Error('sessionStorage is broken');
    }
    window.sessionStorage.removeItem(dummyKey);
    sessionStorageCache = window.sessionStorage;
  } catch (e) {
    sessionStorageCache = new CustomStorage();
  }
  return sessionStorageCache;
}

export const sessionStorage = {
  setItem: (key: string, val: string): void => getSessionStorage().setItem(key, val),
  getItem: (key: string): string | null => getSessionStorage().getItem(key),
  removeItem: (key: string): void => getSessionStorage().removeItem(key),
  clear: (): void => getSessionStorage().clear(),
  length: (): number => getSessionStorage().length,
  key: (index: number): string | null => getSessionStorage().key(index),
  keys(): string[] {
    const storage = getSessionStorage();
    if (storage instanceof CustomStorage) {
      return storage.keys();
    } else {
      return Object.keys(storage);
    }
  },
  getPrefixedKeys: (prefix: string): string[] => {
    return sessionStorage.keys().filter((key) => key.startsWith(prefix));
  },
};
