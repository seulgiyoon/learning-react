const loggerMiddleware = store => next => action => {
  console.group(action && action.type);
  // store.getState()로 상태 객체를 조회할 수 있다
  console.log('이전 상태', store.getState());
  console.log('액션', action);
  next(action);
  console.log('다음상태',store.getState());
  console.groupEnd();
}

export default loggerMiddleware;
