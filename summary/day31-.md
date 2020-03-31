#### 200324 Day 31 - 312~322p
불변성을 지키기 위해 immer 사용하기<br>
immer를 사용한다고 무조건 코드가 간결해지지 않는다. 불변성을 유지하는 코드가 복잡할 때만 사용해도 충분하다. 어디까지나 도구이기에 필요한 때를 선별해 사용하면 된다. (319p)
```js
// input에 입력되는 데이터를 state에 저장하는 함수
const onChange = useCallback((e) => {
  const { name, value } = e.target;
  setForm({
    ...form,
    [name]: [value]
  });
}, [form]);

// immer 적용
const onChange = useCallback((e) => {
  const { name, value } = e.target;
  setForm(
    produce(form, draft => {
      draft[name] = value;
    })
  );
}, [form]);

// immer와 useState 함수형 업데이트 적용
const onChange = useCallback(e => {
  const { name, value } = e.target;
  setForm(
    produce(draft => {
      draft[name] = value;
    })
  );
}, []);
```

<br>

#### 200325 Day 32 - 354~362p
callback, Promise, async/await, axios 사용하기 실습

<br>

#### 200326 Day 33 - 363~370p
뉴스 정보를 불러올 수 있는 newsapi의 API키를 dotenv라이브러리를 이용해 환경변수로 설정해보았다. 리액트에서 사용할 땐 변수명 앞에 `REACT_APP_`을 붙여야 한다. 빌드 시 변수명이 그대로 실제 값으로 변환되어 누구나 볼 수 있게 공개되니 주의해야한다. <br>
- [[Adding Custom Environment Variables | Create React App]](https://create-react-app.dev/docs/adding-custom-environment-variables/)

<br>

#### 200327 Day 34 - 371~377p
useEffect에 직접적으로 등록하는 함수에 async를 붙이면 안된다. useEffect가 반환하는 함수는 뒷정리 함수이기 때문.<br>
`등록된 함수`는 렌더링 직후마다 실행되는 함수 - componentDidMount와 비슷, (두번째 파라미터 배열에 무엇을 넣는지에 따라 실행 조건은 달라짐 - componentDidUpdate와 비슷), `리턴하는 함수`는 컴포넌트가 언마운트 되기 전이나 업데이트 되기 직전에 수행되는 작업이다 - componentWillUnmount와 비슷.(197p)<br>
styled-components는 빌드되면 class명이 랜덤으로 생성된다. 이로 인해 이름 겹침이나 오타로 인한 오류를 방지한다고. 그렇지만 지금은 css에 대해서 잘 알지 않으면 디버깅이 편하지 않다고 느낌.
- [[ Using the Effect Hook | React ]](https://ko.reactjs.org/docs/hooks-effect.html)

<br>

#### 200329 Day 35 - 378~385p
```js
// active가 true일 경우 적용되는 스타일 설정
${props =>
  props.active && css`
    font-weight: 600;
    border-bottom: 2px solid coral;
    color: coral;
`}
```
```jsx
<Category
  key={c.name}
  // 일치하면 true
  active={category === c.name}
  onClick={() => onSelect(c.name)}
>
  {c.text}
</Category>
```
리액트 라우터, NavLink 사용 시
```js
// 일반 HTML 요소가 아닌 특정 컴포넌트에 스타일 지정 시 styled(컴포넌트명) 사용
const Category = styled(NavLink)`
`;
```
```jsx
<Category
  key={c.name}
  // NavLink에서 링크가 활성화되었을 때 적용할 CSS 클래스값 부여 activeClassName
  activeClassName="active"
  exact={c.name === 'all'}
  to={c.name === 'all' ? '/' : `/${c.name}`}
>
  {c.text}
</Category>
```

<br>

#### 200330 Day 36 - 386~390p
프로젝트의 다양한 곳에서 사용될 수 있는 유틸 함수는 보통 src 디렉터리에 lib 디렉터리 안에 작성한다. (387p)<br>
커스텀 훅은 훅과 같은 원리를 가진 오리지널 함수 자체를 만들어 사용한단 의미는 아니고 기존의 훅을 사용해서 원하는 특정한 기능을 구현하는 일. 비슷한 로직을 사용하는 컴포넌트들이 함께 공유할 수 있는, 훅을 사용한 모듈을 따로 빼서 만든다. 커스텀 훅을 만들 경우 함수명을 'use'로 시작하도록 약속한다.<br>
커스텀 훅이 그 훅을 사용하는 컴포넌트 바깥에서 자신만의 state를 가지고 있는데, 그 state의 변화에 따라서 커스텀 훅을 사용하는 함수가 다시 랜더되는 점이 정확하게 이해가 되지 않는다. 더 알아보기
```js
// 커스텀 훅 usePromise
export default function usePromise(promiseCreator, deps) {
  // deps => dependencies
  // 어떤 요소가 바뀌면 함수가 바뀌어야하는 요소, 의존배열을 의미함.
  const [loading, setLoading] = useState(false);
  const [resolved, setResolved] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const process = async () => {
      setLoading(true);
      try {
        const resolved = await promiseCreator();
        setResolved(resolved);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };
    process();
    // deps를 배열 상태로 받아오므로 그대로 넣어준다
  }, deps);

  // state 변화가 있을 때마다 함수 호출, 리턴이 일어난다?
  console.log(loading, resolved, error);
  // 여러 값을 리턴할 때 배열이나 객체에 담아 보내고, 받는 쪽에서 비구조화 할당 활용하기.
  return [loading, resolved, error];
}
```
```js
  // usePromise 사용
  // 비구조화 할당. 반환받은 배열의 첫번째 요소가 loading이라는 이름으로, 나머지도 같은 논리로 각 변수에 할당된다.
  const [loading, response, error] = usePromise(() => {
    const query = category === 'all' ? '' : `&category=${category}`;
    return axios.get(
      `http://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=${process.env.REACT_APP_NEWS_KEY}`,
    );
  }, [category]);
```
- [[ Building Your Own Hooks | React ]](https://ko.reactjs.org/docs/hooks-custom.html)
- [[ 번역: useEffect 완벽 가이드 ]](https://rinae.dev/posts/a-complete-guide-to-useeffect-ko)

<br>

#### 200331 Day 37 - 392~398p
전역적으로 사용할 데이터가 있을 때(로그인 정보, 애플리케이션 환경 설정, 테마 등) 유용한 Context API
```js
// 새로운 Context 만들기
import { createContext } from 'react';
// 지정한 값에는 ColorContext 안의 Consumer 컴포넌트 안 객체로 함수를 통해 접근
// <ColorContext.Consumer>
//   {value => <p>{value.width}</p>}
// </ColorContext.Consumer>
const ColorContext = createContext({
  width: '70px', 
  height: '100px', 
  color: 'black' 
});
```
createContext에 부여한 기본값은 Provider를 사용하지 않았을 때만 사용되는 기본값이다. Provider를 사용하면 그 값이 무시되기에, Provider를 사용하면서 거기에 value값을 부여하지 않으면 읽을 value가 없으므로 오류가 발생한다. (398p)
```js
import ColorContext from './contexts/color';

function App() {
  return (
    // Provider 사용 시 항상 value를 부여한다.
    <ColorContext.Provider value={{
      width: '100px', 
      height: '200px', 
      color: 'coral' 
    }}>
      <ColorBox />
    </ColorContext.Provider>
  );
}
```
- [[ Context.Consumer | React ]](https://ko.reactjs.org/docs/context.html#contextconsumer)
- [[ Render Props | React ]](https://ko.reactjs.org/docs/render-props.html)