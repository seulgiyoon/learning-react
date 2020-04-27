import { createContext, useContext } from 'react';

const PreloadContext = createContext(null);
export default PreloadContext;

export const Preloader = ({ resolve }) => {
  const preloadContext = useContext(PreloadContext);
  if (!preloadContext) return null;
  if (preloadContext.done) return null;

  preloadContext.promises.push(Promise.resolve(resolve()));
  return null;
};

// Hook 형태
export const usePreloader = resolve => {
  const preloadContext = useContext(PreloadContext);
  if (!preloadContext) return null;
  if (preloadContext.done) return null;
  // promises 배열에 Promise를 등록.
  preloadContext.promises.push(Promise.resolve(resolve()));
}