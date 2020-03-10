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

<br>

#### 200113 Day 17 - 218~224p
컴포넌트 스타일링(221p) :
클래스 이름에 컴포넌트 이름을 포함시킴으로써 다른 컴포넌트에서 실수로 중복되는 클래스를 만들어 사용하는 것을 방지할 수 있죠.
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

<br>

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

<br>

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

<br>

#### 200308 Day 20 - 225~230p
$를 머리에 붙여 변수 선언, @mixin으로 스타일 함수 선언, @include로 @mixin 함수 사용하기 (225p)<br>
...여러 파일에서 사용될 수 있는 Sass 변수 및 믹스인은 파일을 따로 작성하여 사용가능 (227p)
```scss
// styles/utils.scss 파일
// 변수 사용
$red: #fa5252;

@mixin square($size) {
  // calculated라는 변수를 사용해서 수치를 계산 및 저장
  $calculated: 32px * $size;
  // 내가 만든 변수가 아닌 건 $없이 사용
  width: $calculated;
  height: $calculated;
}
```
```scss
// SassComponent.scss 파일
// 다른 scss 파일을 @import로 가져와 사용
@import './styles/utils';

.SassComponent {
  display: flex;
  .box { // .SassComponent .box와 동일
    background: red;
    cursor: pointer;
    transition: all 0.3s ease-in;
    &.red { // .SassComponent .box .red
      background: $red;
      @include square(1); // mixin을 사용할 땐 include
    }
    &:hover {
    // .SassComponent .box 에 마우스를 올렸을 때
    background: black;
    }
  }
}
```
import 시 길어지는 상대주소를 줄이고, 파일 이름만으로 가져오기가 가능하게 만들기 (229p)<br>
웹팩에서 Sass를 처리하는 sass-loader의 설정을 커스텀한다. create-react-app으로 만든 프로젝트는 많은 설정들이 숨겨져 있기 때문에, 우선 npm run eject 명령으로 추출한다.<br>
이 때 책과는 달리 Create React App 2는 추출 없이 설정이 가능하다는 안내문이 떴다.
```
Create React App 2+ supports TypeScript, Sass, CSS Modules and more without ejecting: https://reactjs.org/blog/2018/10/01/create-react-app-v2.html
```
명령을 통해 추출하면 webpack.config.js 파일에서 sass-loader설정에 접근할 수 있다.
책에 나온 예시 코드는 이것인데, 버전이 맞지 않는 탓인지 에러가 발생한다.
```js
{
  test: sassRegex,
  exclude: sassModuleRegex,
  use: getStyleLoaders({
      importLoaders: 2,
      sourceMap: isEnvProduction && shouldUseSourceMap,
    }).concat({
      loader: require.resolve('sass-loader'),
      options: {
        includePaths: [paths.appSrc + '/styles'],
        sourceMap: isEnvProduction && shouldUseSourceMap,
      }
    }),
  sideEffects: true,
},
```
다른분이 올려주신 이슈를 보고 해결했다. 그러나 우선 저 부분이 어떻게 구성된건지 이해할 필요가 있기에 내일 더 알아보겠다.
https://github.com/gilbutITbook/080203/issues/2
```js
{
  test: sassRegex,
  exclude: sassModuleRegex,
  use: getStyleLoaders({
      importLoaders: 2,
      sourceMap: isEnvProduction && shouldUseSourceMap,
    }).concat({
      loader: require.resolve('sass-loader'),
      options: {
        sassOptions: {
          includePaths: [paths.appSrc + '/styles'],
          sourceMap: isEnvProduction && shouldUseSourceMap
        }
      }
    }),
  sideEffects: true,
},
```

<br>

#### 200309 Day 21 - 231~233p
만약 항상 utils.scss의 함수와 변수를 사용한다면, 매번 파일 상단에 @import 'utils.scss';를 적지 않고 sass-loader에 옵션을 설정하여 자동으로 포함시킬 수 있다. (231p)<br>
책에 나온 예시 코드가 에러가 발생해서 https://github.com/webpack-contrib/sass-loader 에서 `prependData`옵션을 찾았다.<br>
2019년 8월 초판 발행 책이지만 변화가 빨라서인지 바뀌는 부분이 많다.
```js
{
  test: sassRegex,
  exclude: sassModuleRegex,
  use: getStyleLoaders({
      importLoaders: 2,
      sourceMap: isEnvProduction && shouldUseSourceMap,
    }).concat({
      loader: require.resolve('sass-loader'),
      options: {
        sassOptions: {
          includePaths: [paths.appSrc + '/styles'],
          sourceMap: isEnvProduction && shouldUseSourceMap,
        },
        // 책에서는 data: `@import 'utils';`였던 부분
        prependData: `@import 'utils';`,
      }
    }),
  sideEffects: true,
},
```

물결문자를 사용하면 import시에 라이브러리 경로를 짧게 줄일 수 있다. 주의점은 `~/` 는 홈 디렉토리이므로 `~` 단독으로만 적는다.<br>
```scss
// include-media -> 미디어쿼리 관리가 용이한 라이브러리
// open-color -> 사용하기 편리하고 조화로운 색상들을 정의한 라이브러리
@import '~include-media/dist/include-media';
@import '~open-color/open-color';

.SassComponent {
  display: flex;
  background: $oc-yellow-2;
  // 미디어 가로 크기가 768px 미만일 경우 라임색으로 배경색이 변한다
  @include media('<768px') {
    background: $oc-lime-3;
  }
  // ... 다른 스타일들 ...
}
```

<br>

#### 200310 Day 22 - 234~p
css 파일을 모듈화하여 사용하고 싶을 경우, CRA v2부터는 파일명 뒤에 .module을 붙여주면 알아서 인식한다. (234p)<br>
```css
/* wrapper와 inverted를 동시 적용할 경우에는 뒤에 적힌 inverted가 wrapper와 중복된 속성,
   background, color를 덮어쓴다. 
*/

.wrapper {
  background: black;
  padding: 1rem;
  color: white;
  font-size: 2rem;
}

.inverted {
  color: black;
  background: white;
  border: 1px solid black;
}

/* 글로벌로 적용시키려면 :global을 붙여준다 */
:global .something {
  font-weight: 800;
  color: aqua;
}
```
```jsx
import styles from './CSSModule.module.css';

// CSSModule.module.css에서 스타일 객체들이 담긴 객체(내가 import하면서 정한 이름으로. 여기서는 styles)를 전달받게 된다
// 그래서 styles.스타일명 으로 스타일을 불러옴
// 만약 :global로 선언한 스타일이라면 그 객체 안에 담겨있지 않고 바로 적용된다
// 두 가지 스타일 객체를 동시에 적용할 땐, css파일 상에 뒤에 기입된 코드가 앞에 기입된 코드와 중복된 부분이 있을 시 덮어쓴다.
// <div className={`${styles.inverted} ${styles.wrapper}`}>
function CssModule() {
  return (
    <div>
      <div className={[styles.inverted, styles.wrapper].join(' ')}>
        안녕하세요, 저는 <span className="something">CSS MODULE</span>
      </div>
    </div>
  )
};
```
조건부로 className을 설정하기 용이한 라이브러리 classnames (238p)<br>
props로 받은 어떤 값이 true인지 false인지에 따라서 어떤 class를 설정할지 안할지 결정할 수 있다.<br>
더불어서 css 모듈 사용 시 import한 styles객체를 this로 설정한 함수를 bind()를 이용해 만들어서 스타일 객체명만 바로 사용가능.<br>
```jsx
import classNames from 'classnames/bind';

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
```
styles 안에 어떤 값들이 있는지 바로 나온다면 좋겠는데. TypeScript로 가능할까?
