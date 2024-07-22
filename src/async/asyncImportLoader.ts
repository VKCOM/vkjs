/**
 * Выполняет Promise функцию, пока она не завершится удачей. Может
 * использоваться для асинхронной загрузки модулей при плохом интернете
 *
 * @example
 * const HeaderLazyComponent = React.lazy(() => asyncImportLoader(() => import('../components/Header/Header')));
 *
 * @example
 * asyncImportLoader(() => import('some-module'), 20).then((someModule) => {
 *   someModule.init();
 * });
 *
 * @param asyncImport Функция, которую требуется выполнить
 * @param attempts Максимальное количество попыток
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
