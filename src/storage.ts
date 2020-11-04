import { Dictionary } from './types';

class CustomStorage {
  private data: Dictionary<string> = {};

  public setItem(key: string, val: string) {
    this.data[key] = String(val);
  };

  public getItem = (key: string) => this.data.hasOwnProperty(key) ? this.data[key] : null;

  public removeItem(id: string) {
    delete this.data[id];
  };

  public clear() {
    this.data = {};
  }

  public get length() {
    return Object.keys(this.data).length;
  };

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
  setItem: (key: string, val: string) => getLocalStorage().setItem(key, val),
  getItem: (key: string) => getLocalStorage().getItem(key),
  removeItem: (key: string) => getLocalStorage().removeItem(key),
  clear: () => getLocalStorage().clear(),
  length: () => getLocalStorage().length,
  key: (index: number) => getLocalStorage().key(index),
  keys(): string[] {
    const storage = getLocalStorage();
    if (storage instanceof CustomStorage) {
      return storage.keys();
    } else {
      return Object.keys(storage);
    }
  },
  getPrefixedKeys: (prefix: string): string[] => localStorage.keys().filter((key) => key.startsWith(prefix)),
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
  setItem: (key: string, val: string) => getSessionStorage().setItem(key, val),
  getItem: (key: string) => getSessionStorage().getItem(key),
  removeItem: (key: string) => getSessionStorage().removeItem(key),
  clear: () => getSessionStorage().clear(),
  length: () => getSessionStorage().length,
  key: (index: number) => getSessionStorage().key(index),
  keys(): string[] {
    const storage = getSessionStorage();
    if (storage instanceof CustomStorage) {
      return storage.keys();
    } else {
      return Object.keys(storage);
    }
  },
  getPrefixedKeys: (prefix: string): string[] => sessionStorage.keys().filter((key) => key.startsWith(prefix)),
};
