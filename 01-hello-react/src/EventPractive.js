import React, {useState} from 'react';

const EventPractive = () => {
  // const [name, setName] = useState('');
  // const [message, setMessage] = useState('');
  // const onChangeUserName = (e) => setName(e.target.value);
  // const onChangeMessage = (e) => setMessage(e.target.value);

  // const onClick = () => {
  //   alert(name + ', ' + message);
  //   setName('');
  //   setMessage('');
  // }

  // e.target.name을 사용하기 위해서 form 객체 활용
  const [form, setForm] = useState({name: '', message: ''})

  const {name, message} = form;

  // form 객체를 전체를 다시 할당해준다
  const onChange = (e) => {
    const newFrom = {
      ...form, // 기존 form 내용 복사
      [e.target.name]: e.target.value // 원하는 값 할당하여 덮어씌움
    };
    setForm(newFrom);
  }

  const onClick = () => {
    alert(name + ', ' + message);
    setForm({
      name: '',
      message: ''
    });
  }

  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      onClick();
    }
  }

  return (
    <div>
      <input
        type="text"
        name="name"
        value={name}
        onChange={onChange}
      />
      <input
        type="text"
        name="message"
        value={message}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
      <button
        onClick={onClick}
      >팝업</button>
    </div>
  );

  // return (
  //   <div>
  //     <input
  //       type="text"
  //       name="name"
  //       value={name}
  //       onChange={onChangeUserName}
  //     />
  //     <input
  //       type="text"
  //       name="message"
  //       value={message}
  //       onChange={onChangeMessage}
  //       onKeyPress={onKeyPress}
  //     />
  //     <button
  //       onClick={onClick}
  //     >팝업</button>
  //   </div>
  // );
};

export default EventPractive;