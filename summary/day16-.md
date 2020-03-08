#### 200112 Day 16 - 210~217p
함수형 컴포넌트에서 ref를 쉽게 사용할 수 있는 useRef :
```jsx
// ref 객체를 설정. ()에는 초기값을 넣는다.
const inputEl = useRef(null);

const onClick = () => {
	// ..이런저런 동작..
  // 동작이 끝나면 지정한 ref객체에 focus가 가도록 한다.
  inputEl.current.focus();
}

// input 엘리먼트를 ref로 지정
return (
  <div>
    <input
      ref={inputEl}
    />
  </div>
)
```
211p에 useRef로 로컬 변수 사용하는 법을 설명하면서, useRef(여기)에 초기값을 null이 아닌 걸 넣고 활용하는데 쓰임새가 정확히 이해는 가지 않았음.

#### 200113 Day 17 - 218~224p
컴포넌트 스타일링(221p) :
1.클래스 이름에 컴포넌트 이름을 포함시킴으로써 다른 컴포넌트에서 실수로 중복되는 클래스를 만들어 사용하는 것을 방지할 수 있죠.
```css
.App-logo {
	/* ... */
}
```
비슷한 방식으로 BEM 네이밍이라는 방식도 있습니다. BEM 네이밍은 CSS 방법론 중 하나로, 이름을 지을 때 일종의 규칙을 준수하여 해당 클래스가 어디에서 어떤 용도로 사용되는지 명확하게 작성하는 방식입니다.
→ 참고 :  [https://seesparkbox.com/foundry/bem_by_example](https://seesparkbox.com/foundry/bem_by_example) 
CSS Selector를 사용하면 CSS 클래스가 특정 클래스 내부에 있는 경우에만 스타일을 적용할 수 있습니다.
```css
// App 클래스 내부의 logo 클래스에 적용
.App .logo {
	/* ... */
}

// Login 클래스 내부의 logo 클래스에 적용
.Login .logo {
  /* ... */
}
```

#### 200114 Day 18 - 324~332p
리액트 라우터 적용하기 :
프로젝트에 리액트 라우터를 적용할 때는 src/index.js 파일에서 react-router-dom에 내장되어 있는 BrowserRouter라는 컴포넌트를 사용하여 감싸면 됩니다. 이 컴포넌트는 웹 애플리케이션에 **HTML5의 History API를 사용**하여 페이지를 새로고침하지 않고도 주소를 변경하고, 현재 주소에 관련된 정보를 props로 쉽게 조회하거나 사용할 수 있도록 해줍니다. (327p)
```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>, 
  document.getElementById('root')
);
```
2주 프로젝트에 라우터를 사용해야 해서 이부분으로 뛰어넘어옴. Route, Link 컴포넌트 실습함.

#### 200114 Day 19 - 333~338p
`/profile/username` 처럼 뒷부분에 유동적인 `username` 값을 넣어줄 때, 해당 값을 `props`로 받아 와서 조회하는 방법 (336p)
```jsx
// App.js
<Link to="/profile/sgyoon">윤슬기 프로필</Link>
//...//
<Route path="/profile/:username" component={Profile} />

// Profile.js
const data = {
  sgyoon: {
    name: '윤슬기',
    description: '팀 태슬라 팀원1'
  },
}

const Profile = ({ match }) => {
  // 라우트로 사용되는 컴포넌트에서 받아오는 match라는 객체 안의 params값을 참조
  console.log(match);
  const { username } = match.params;
  const profile = data[username];
```
`sgyoon`을 파라미터로 넘겼을 때 `match` 객체 구성