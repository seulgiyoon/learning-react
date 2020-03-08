import React, { useState, useEffect } from 'react';

const Info = () => {

  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');

  const onChangeName = (e) => setName(e.target.value);
  const onChangeNickname = (e) => setNickname(e.target.value);
  useEffect(() => {
    console.log('effect');
    // console.log(name);
    return () => {
      console.log('cleanup');
      // console.log(name);
    };
  }, []);

  return (
    <div>
      <input
        type="text"
        name="name"
        onChange={onChangeName}
      />
      <input
        type="text"
        name="nickname"
        onChange={onChangeNickname}
      />      
      <h2>이름: {name}</h2>
      <h2>별명: {nickname}</h2>
    </div>
  );
};

export default Info;