/**
 * Loads async import with retries. It can be useful for bad internet connection
 *
 * @example
 * const HeaderLazyComponent = React.lazy(() => asyncImportLoader(() => import('../components/Header/Header')));
 *
 * @example
 * asyncImportLoader(() => import('some-module'), 20).then((someModule) => {
 *   someModule.init();
 * });
 */
export const asyncImportLoader = <T>(asyncImport: () => Promise<T>, attempts = 10): Promise<T> => {
  return new Promise((resolve, reject) => {
    asyncImport()
      .then(resolve)
      .catch((error) => {
        setTimeout(() => {
          if (attempts === 0) {
            reject(error);
            return;
          }
          asyncImportLoader(asyncImport, attempts - 1).then(resolve, reject);
        }, 1000);
      });
  });
};
