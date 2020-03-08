import React from 'react';

const data = {
  sgyoon: {
    name: '윤슬기',
    description: '팀 태슬라 팀원1'
  },
  rami: {
    name: '태라미',
    description: '팀 태슬라 팀원2'
  },
  taegwan: {
    name: '민태관',
    description: '팀 태슬라 팀원3'
  }
}

const Profile = ({ match, location }) => {
  // 라우트로 사용되는 컴포넌트에서 받아오는 match라는 객체 안의 params값을 참조
  console.log(location)
  const { username } = match.params;
  const profile = data[username];

  if (!profile) {
    return <div>존재하지 않는 사용자입니다.</div>
  }
  return (
    <div>
      <h3>{username}({profile.name})</h3>
      <p>{profile.description}</p>
    </div>
  );
};

export default Profile;