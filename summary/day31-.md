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