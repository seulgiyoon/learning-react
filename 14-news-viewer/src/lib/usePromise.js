import { useState, useEffect } from 'react';

export default function usePromise(promiseCreator, deps) {
  // deps => dependencies
  // 어떤 요소가 바뀌면 함수가 바뀌어야하는 요소, 의존배열을 의미함.
  const [loading, setLoading] = useState(false);
  const [resolved, setResolved] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const process = async () => {
      setLoading(true);
      try {
        const resolved = await promiseCreator();
        setResolved(resolved);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };
    process();
    // deps를 배열 상태로 받아오므로 그대로 넣어준다
  }, deps);

  // state 변화가 있을 때마다 함수 호출, 리턴이 일어난다?
  console.log(loading, resolved, error);
  // 여러 값을 리턴할 때 배열이나 객체에 담아 보내고, 받는 쪽에서 비구조화 할당 활용하기.
  return [loading, resolved, error];
}
