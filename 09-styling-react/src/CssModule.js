import React from 'react';
import classNames from 'classnames/bind';
import styles from './CSSModule.module.scss';

// CSSModule.module.css에서 styles 이 담긴 객체(내가 import 하면서 정한 이름으로. 여기서는 styles)를 전달받게 된다
// 그래서 styles.스타일명 으로 스타일을 불러옴
// 만약 :global로 선언한 스타일이라면 그 객체 안에 담겨있지 않고 바로 적용된다
// 두가지 스타일 객체를 동시에 적용할 땐, css파일 상에 뒤에 기입된 코드가 앞에 기입된 코드와 중복된 부분이 있을 시 덮어쓴다.
// <div className={`${styles.inverted} ${styles.wrapper}}>

// styles를 this로 설정한 새로운 함수 cx를 선언. 이라는 이미지. (이 bind는 classnames의 bind 함수이다)
const cx = classNames.bind(styles);

function CssModule() {
  return (
    <div>
      <div className={cx('wrapper', 'inverted')}>
        안녕하세요, 저는 <span className="something">CSS MODULE</span>
      </div>
    </div>
  )
};

export default CssModule;
