import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import User from '../components/User';
import { Preloader } from '../lib/PreloadContext';
import { getUser } from '../modules/users';

function UserContainer({ id }) {
  const user = useSelector(state => state.users.user);
  const dispatch = useDispatch();

  useEffect(() => {
    // 유저 데이터가 존재하고, 그 데이터의 id가 url 파라미터로 받은 id와 일치하는지 판단
    // 일치한다면 다시 데이터를 요청하지 않는다
    if (user && user.id === parseInt(id, 10)) return;
    dispatch(getUser(id));
  }, [dispatch, id, user]);

  // 유저 데이터가 없는 경우 Preloader 컴포넌트를 불러서 서버사이드 렌더링
  if (!user) {
    return <Preloader resolve={() => dispatch(getUser(id))} />;
  }
  return <User user={user} />;
}

export default UserContainer;
