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

#### 200310 Day 22 - 234~239p
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

<br>

#### 200313 Day 23 - 240~247p
자바스크립트 파일 안에 스타일을 선언하는 'CSS-in-JS' 방식. 대표적인 라이브러리 styled-components.(241p)<br>
styled-components는 Tagged templates의 속성을 이용해서 자바스크립트 함수나 객체를 온전히 추출할 수 있다.(245p)<br>
```js
// 엘리먼트 만들기
import styled from 'styled-components';

// styled.태그명
const MyComponent = styled.div`
`;

// 혹은 태그의 타입을 styled 함수의 인자로 전달한다
const MyInput = styled('input')`
`;
```

더보기
- [[ CSS 값과 단위 | MDN ]](https://developer.mozilla.org/ko/docs/Learn/CSS/Building_blocks/Values_and_units)
- [[ CSS: 선택자(Selector) 이해 | Nextree ]](http://www.nextree.co.kr/p8468/)
- [[ Template literals - Tagged templates | MDN ]](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Template_literals)

<br>

#### 200316 Day 24 - 248~252p
조건부 스타일링 시 props를 사용하지 않는다면 css를 불러와 사용하지 않아도 괜찮지만, css를 사용하면 함수 인식 및 하이라이팅이 가능해서 편리하다. (249p)<br>
미디어 쿼리 적용 시 함수를 사용할 수 있다. 이런 함수들은 모듈화 하여 여러곳에서 사용하면 편리. (251p)
```js
const sizes = {
  desktop: 1024,
  tablet: 768,
};

// sizes 안에 있는 크기들에 따라 @media (max-width: size){} 형태의 결과를 내는 함수를 생성하는 함수.
// reduce로 media 객체 안에 생성된 함수는 desktop: (...args) => { return css style } 형태.
// 인자로 미디어 크기에 따라 적용할 스타일을 넘긴다. media.desktop`width: 768px;`처럼 함수는 tagged 템플릿 리터럴 형태로 작성.
// sizes에 입력된 수치는 em으로 바뀌도록 되어 있었는데 px로 해보았음.
const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label]}px) {
      ${css(...args)};
    }
  `;
  console.log(acc);
  return acc;
}, {});
```

<br>

#### 200317 Day 25 - 254~261p
컴포넌트 파일을 components 디렉터리에 넣는 이유는 기능이나 구조상 필요하기 때문이 아니라 자주 사용되는 관습이기 때문 (257p)<br>
작은 프로젝트에서는 사실상 폴더를 따로 만들어서 넣을 필요까지는 없는데 습관 형성상 + 관습 파악을 위해 한다는 의미인 듯<br>
control+space는 VS Code의 자동완성 단축키. 컴포넌트 이름을 입력할 때 이 키로 자동완성 창을 열 수 있다.<br>
```json
// jsconfig.js
// 자동완성을 위한 세팅 target: "es6" -> 이부분이 자동완성과 어떤 관련이 있는건지 연관성을 아직 이해 못함
// 절대 경로를 사용할 수 있는 세팅 (e.g. '../components/button'이 아닌 'components/button')
{
  "compilerOptions": {
    "target": "es6",
    "baseUrl": "src"
  },
  "include": ["src"]
}
```

- VS Code 에디터의 여러가지 설정을 할 수 있는 jsconfig.js [[ jsconfig.js란 ]](https://code.visualstudio.com/docs/languages/jsconfig)
- SVG 아이콘을 컴포넌트처럼 사용 가능한 라이브러리 [[ react-icons ]](http://react-icons.netlify.com/#/)

<br>

#### 200318 Day 26 - 262~270p
할 일을 입력하는 엘리먼트를 `<form>`태그로 만들었다는 점 기억하기
```scss
.TodoListItem {
  // .TodoListItem이라는 클래스를 가졌으면서 짝수번째인 엘리먼트에 적용
  &:nth-child(even) {
    background: rgba(255, 127, 80, 0.2);
  // 엘리먼트 사이에 테두리를 넣는다
  & + & {
    border-top: 1px solid coral;
  }
}
```
- [[ CSS: line-height 속성 이해하기 | 꿀벌개발일지 ]](https://ohgyun.com/572)

<br>

#### 200319 Day 27 - 271~280p
```jsx
import cn from 'classnames';

function TodoListItem({ todo }) {
  const { text, checked } = todo;
  return (
    {/* 'checkbox'는 항상 들어가고, checked는 값이 true일 경우에만 들어간다 */}
    <div className={ cn('checkbox', { checked })}>
  );
};
```
컴포넌트의 성능을 위해 props로 전달할 함수를 만들 땐 useCallback을 이용해 함수를 감싸자 (277p)
```js
// 성능 최적화. useCallback으로 리랜더되어도 함수를 다시 만들지 않고 사용(208p)
// 이 함수는 어떤 기존 값을 참조하지 않고 새로 들어온 값을 무조건 받아서 바꾸기 때문에
// []안에 특정한 값을 지정할 필요가 없다
const onChange = useCallback(e => {
  setValue(e.target.value);
}, []);
```
button 엘리먼트의 onClick에 함수를 걸어서 처리할 수도 있는데 form 엘리먼트의 onSubmit 이벤트에 함수를 건 이유는, onSubmit 이벤트는 인풋에서 enter 키를 누르면 발동하도록 이미 짜여져있기 때문이다. 버튼의 onClick에 엔터키 발동을 걸려면 따로 함수를 만들어서 처리해야하고. 대신 onSubmit 이벤트는 새로고침을 막아야함. (280p)
```js
// 할일 목록에 붙을 id. 화면에 랜더되거나 이 값으로 인해 컴포넌트가 리랜더되어야 할 필요가 없으므로
// useRef를 이용한다 (211p)
const nextId = useRef(4);

const onInsert = useCallback(
  text => {
    const newTodo = {
      // useRef의 현재 값은 .current로 얻는다
      id: nextId.current,
      text: text,
      checked: false,
    };
    setTodos(todos.concat(newTodo));
    nextId.current = nextId.current + 1;
  },
  // 여기에 todos를 넣지 않으면, 맨 처음 랜더되었을때의 todos 값만을 함수가 기억함
  // 그래서 계속 기존 목록에 새로운값이 교체되며 추가될뿐 축적되지 않는다.
  // hooks들은 closure를 이용하는걸까?
  [todos],
);
```
- [[번역] 심층 분석: React Hook은 실제로 어떻게 동작할까?](https://hewonjeong.github.io/deep-dive-how-do-react-hooks-really-work-ko/)

<br>

#### 200320 Day 28 - 281~287p
```js
const onToggle = useCallback(
  id => {
    setTodos(
      // 요소 내용 변경 시 삼항연산자로 한 건 처음. id일치하면 toggle, 아니면 그냥 그대로 리턴.
      todos.map(todo =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo,
      ),
    );
  },
  [todos],
);
```

<br>

#### 200322 Day 29 - 290~299p
무거운 렌더링을 체험하기 위해 객체 2500개를 렌더. 이 과정에서 2500개의 객체를 생산하는 함수를 생성해 사용하는데, 객체를 담은 배열을 useState에 설정할 때 `functionName()` 이 아닌 `functionName`을 넣는다. 함수 실행을 넣을 경우, 리렌더링 될 때마다 다시 함수가 호출되지만 함수명을 넣으면 최초 렌더시에만 호출된다. (291p)
```js
// createBulkTodos()를 넣으면 렌더링시마다 함수가 호출된다.
const [todos, setTodos] = useState(createBulkTodos);
```
크롬 개발자도구의 'Performance' 탭으로 성능을 분석하기. 녹화 버튼을 누르고 어떤 동작을 실행한 뒤 정지하면 성능 분석 결과가 나타난다. Timings 탭을 열면 각 시간대에 컴포넌트의 어떤 작업이 처리되었는지 확인할 수 있다. (294p)<br>
컴포넌트의 props가 바뀌지 않았다면 리렌더링하지 않도록 설정해서 함수형 컴포넌트의 성능을 최적화할 수 있다. React.memo사용. 만든 함수를 감싸면 된다. (295p)
```js
export default React.memo(TodoListItem);
```
더불어 함수들이 어떤 요소가 업데이트 될 때 따라서 다시 만들어지지 않도록, 함수형으로 useState를 업데이트한다. (298p)<br>
App.js의 함수들을 함수형 업데이트로 바꿔주자 할 일을 체크하는 동작 소요시간이 1.9s에서 0.2s로 줄어들었다.
```js
const onInsert = useCallback(
  text => {
    const newTodo = {
      id: nextId.current,
      text: text,
      checked: false,
    };
    // useState의 함수형 업데이트. 바로 새 값을 넣지 않고, 어떻게 업데이트할지를 정해준다.
    // 이렇게 하면 52번줄에 todos를 넣지 않아도 되고, 따라서 todos가 바뀔 때마다 함수가 바뀌는 일이 사라진다.
    setTodos(todos => todos.concat(newTodo));
    nextId.current = nextId.current + 1;
  },
  // 원래 todos가 있었음. todos가 바뀔 때마다 onInsert함수가 바뀌었다.
  [],
);
```

<br>

#### 200323 Day 30 - 300~305p
상태를 업데이트하는 로직이 많다면 useReducer를 사용하면 좋겠다. 컴포넌트 바깥에 로직들을 둘 수 있음. (302p)<br>
불변성을 지키지 않으면 객체 내부 값이 새로워저도 바뀐 것을 감지하지 못하므로 React.memo 등에서 전과 후를 비교하여 리렌더 여부를 결정하지 못한다. (303p)<br>
리스트 관련 컴포넌트 작성 시 리스트 아이템과 리스트 자체를 최적화하기. 그러나 데이터가 많지 않거나 업데이트가 별로 없다면 안해도 된다. 어떤 경우에 어떤 컴포넌트가 리렌더되는지, 최적화를 할 상황인지 판단할 수 있어야함. (305p)
```js
// useReducer의 두번째 인자로 초기값을 넣어주는데, 그를 undefined로 주고 함수를 세번째 인자로 넣으면 첫 렌더시에만 함수가 호출된다
const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos);
```
React.memo의 비교 방식을 수정하고 싶다면 React.memo() 두 번째 매개변수로 비교함수를 만들어 넘겨주면 된다.
```js
export default React.memo(
  TodoListItem,
  (prevProps, nextProps) => prevProps.todo === nextProps.todo,
);
```
스크롤을 해야지만 보이는 컴포넌트들도 리렌더시 항상 같이 렌더된다. 이를 렌더하지 않고 크기만 차지하게끔 하는 라이브러리 react-virtualized (305p)<br>
리스트에 반복적으로, 같은 크기로 생성되는 엘리먼트 크기를 측정한다(테두리를 포함해야하므로 두번째 엘리먼트의 크기를 기준으로 잡는다). (306p)
```jsx
function TodoList({ todos, onRemove, onToggle }) {
  // List 컴포넌트에서 각 TodoListItem을 랜더할 때 사용할 함수
  const rowRenderer = useCallback(
    ({ index, key, style }) => {
      const todo = todos[index];
      return (
        <TodoListItem
          key={key}
          todo={todo}
          onRemove={onRemove}
          onToggle={onToggle}
          style={style}
        />
      );
    },
    [todos, onRemove, onToggle],
  );

  return (
    <List
      className="TodoList"
      width={512} // 리스트 전체 가로 크기
      height={513} // 리스트 전체 높이
      rowCount={todos.length} // 전체 항목 개수
      rowHeight={57} // 아이템 개별 항목의 높이
      rowRenderer={rowRenderer} // 아이템 개별 항목을 랜더할 때 사용하는 함수
      list={todos} // 랜더할 배열
      style={{ outline: 'none'}} // List에 기본 적용되는 outline 스타일 제거
    />
  );
}
```
- [react-virtualized](https://www.npmjs.com/package/react-virtualized)
- [React.memo() 현명하게 사용하기](https://ui.toast.com/weekly-pick/ko_20190731/)