import React, { useEffect } from 'react';
import Users from '../components/Users';
import { connect } from 'react-redux';
import { getUsers } from '../modules/users';
import { Preloader } from '../lib/PreloadContext';

function UsersContainer({ users, getUsers }) {
  useEffect(() => {
    // 이미 users가 유효하다면 getUsers로 정보를 다시 요청하지 않는다.
    if (users) return;
    getUsers();
  }, [users, getUsers]);

  return (
    <div>
      <Users users={users} />
      <Preloader resolve={getUsers} />
    </div>
  )
}

export default connect(
  state => ({users: state.users.users}),
  {
    getUsers
  }
)(UsersContainer);
