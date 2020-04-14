import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Sample from '../components/Sample';
import { getPost, getUsers } from '../modules/sample';

function SampleContainer({ getPost, getUsers, loadingPost, loadingUsers, post, users }) {

  useEffect(() => {
    const fn = async () => {
      try {
        await getPost(1);
        await getUsers(1);
      }
      catch(error) {
        console.error(error)
      }
    };
    fn();
  }, [getPost, getUsers]);

  return (
    <Sample loadingPost={loadingPost} loadingUsers={loadingUsers} post={post} users={users} />
  );
};

// 기능별로 나눈 여러 모듈에서 값을 가져오기.
// 여기서는 state.sample, state.loading에서 상태값을 가져옴
// 하나의 컴포넌트에서 여러 모듈로부터 state 조회해서 사용한다.
export default connect(
  ({ sample, loading }) => ({
    loadingPost: loading['sample/GET_POST'],
    loadingUsers: loading['sample/GET_USERS'],
    post: sample.post,
    users: sample.users
  }),
  {
    getPost,
    getUsers
  }
)(SampleContainer);
