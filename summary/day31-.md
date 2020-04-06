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

<br>

#### 200401 Day 38 - 399~405p
Provider를 Consumer가 구독하는 구조. Context를 만들고(createContext), 거기에 데이터를 집어넣고(Provider), 필요한 곳에서 꺼내 쓰기(Consumer) <br>
Consumer를 통해서 Provider에 접근할 수 있다. <br>
마우스 오른쪽 클릭 이벤트 설정 `onContextMenu`
```js
// Provider 지정
const ColorProvider = ({ children }) => {
  const [color, setColor] = useState('black');
  const [subcolor, setSubcolor] = useState('red');

  const value = {
    state: { color, subcolor },
    actions: { setColor, setSubcolor }
  };

  return (
    <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
  );
}
```
```jsx
function ColorBox() {
  return (
    // Consumer를 통해서 Provider에 접근할 수 있다 - state 접근
    <ColorConsumer>
      {({ state }) => (
        <div 
          style={{ 
            width: '50px', 
            height: '50px', 
            background: state.color 
          }} 
        />
      )}
    </ColorConsumer>
  );
};
```
```jsx
function SelectColors() {
  return (
    {/* Consumer를 통해서 Provider에 접근할 수 있다 - state, action 접근 */}
    <ColorConsumer>
      <div>
        {({ state, actions }) => (
            <div 
              style={{
                width: '20px', 
                height: '20px', 
                background: 'red', 
              }} 
              onClick={() => actions.setColor('red')}
            />
          ))}
        )}
      </div>
    </ColorConsumer>
  )
}
```
- [[ Context | React ]](https://ko.reactjs.org/docs/context.html)
- [[ 상태 관리 도구로서의 React Context | chatoo의 웹개발 블로그 ]](https://chatoo2412.github.io/javascript/react/react-context-as-a-state-management-tool/)

<br>

#### 200402 Day 39 - 406~417p
Consumer 대신 Hook이나 static contextType을 사용할 수 있다. (406p)
```js
// (함수형 컴포넌트에서) useContext로 바로 컨텍스트의 값을 조회한다.
const { state } = useContext(ColorContext);
```
```jsx
class SelectColors extends Component {

  // (클래스형 컴포넌트에서) 컨텍스트 설정
  // 하나의 컨텍스트만 구독할 수 있다.
  static contextType = ColorContext;

  // this.context로 값에 접근 
  render() {
    return (
      (...)
      onClick={() => this.context.actions.setColor(color)}
      (...)
    )
  }
}
```
- [[ Class.contextType | React ]](https://ko.reactjs.org/docs/context.html#classcontexttype)

<br>

#### 200403 Day 40 - 418~428p
redux 맛보기. 액션 타입과 액션 생성 함수 작성 -> 리듀서 작성 -> 스토어 만들기.<br>
리덕스는 리액트처럼 데이터 변경을 감지할 때 성능을 높이기 위해 얕은 비교를 사용하므로, 데이터의 불변성을 지켜야한다. 요소의 값 자체가 아닌 참조하는 곳이 같은지만을 보는 것. 그래서 객체가 가진 요소가 완전히 같아도 참조점이 다른 메모리 공간을 점유하고 있으면 둘은 같지 않다. 그러나 불변성을 지키지 않고(새로운 메모리 공간을 차지하도록 복사 하지 않고) 기존 객체에 접근해서 값을 변경하면 그 둘은 결국 같은 곳을 바라보고 있으므로 예전 값과 새로운 값이 같다고 판정한다.<br>
그 외에 단일 스토어 가지기 / 순수함수로만 리듀서를 구성하기(그렇지 않은 동작들은 미들웨어를 통하거나 리듀서 함수 바깥에서 처리하기)라는 규칙이 있다.
- [[ How does shallow compare work in react | Stack Overflow ]](https://stackoverflow.com/questions/36084515/how-does-shallow-compare-work-in-react)
- [[ Parcel ]](https://ko.parceljs.org/)

<br>

#### 200404 Day 41 - 430~438p
리액트 프로젝트에서 리덕스를 사용할 때 많이 사용하는 패턴은 프레젠테이셔널 컴포넌트와 컨테이너 컴포넌트를 분리하는것이다. 프레젠테이셔널 컴포넌트는 대부분의 경우 상태 관리가 이루어지지않고, 부모 컴포넌트로부터 받은 데이터를 이용해 화면에 UI를 보여주는 역할만을 담당하는 컴포넌트이다. 컨테이너 컴포넌트는 리덕스와 연동되어 상태를 받아오거나 스토어에 액션을 디스패치하는 컴포넌트이다. 이러한 구조는 코드의 재사용성을 높이고 관심사를 분리해 UI를 작성하기 수월하다. 관례로 프레젠테이셔널 컴포넌트는 components 폴더에, 컨테이너 컴포넌트는 containers 폴더 안에 작성한다. (431p)<br>
리덕스 관련 코드를 작성할 때는 actions, constants, reducers 폴더를 만들어 그 안에 기능별로 파일을 분류하여 넣을 수도 있고, modules 폴더 안에 관련있는 컴포넌트에 대한 액션타입, 액션 생성 함수, 리듀서 함수를 모두 몰아 작성할 수도 있다. (436p)<br>
```js
// 액션 타입 정의. 문자열의 내용은 이름 충돌을 방지하기 위해서 '모듈 이름/액션 이름' 형태로 작성한다.
const INCREASE = 'counter/INCRESE';
const DECREASE = 'counter/DECREASE';
```
```js
// export 키워드로 다른 파일에서 불러올 수 있도록 액션 생성 함수를 작성
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });

// 리듀서 함수
const counter = (state = initialState, action) => {
  switch(action.type) {
    case INCREASE:
      return {
        number: state.number + 1
      }
    case DECREASE:
      return {
        number: state.number - 1
      }
    default:
      return state
  }
}

export default counter;

// 현재 파일에서 내보낸 함수들을 다른 파일에서 import한다면 
// import counter, { increase, decrease } from './counter'가 된다.
```

<br>

#### 200405 Day 42 - 439~446p
스토어에는 리듀서를 하나만 사용해야 함. combineReducers 메서드를 이용해서 만든 리듀서들을 하나로 합쳐준다. (442p)
```js
import { combineReducers } from 'redux';
import counter from './counter';
import todos from './todos';

const rootReducer = combineReducers({
  counter,
  todos,
});

export default rootReducer;
```
```jsx
// index.js
// 만든 리듀서로 redux 스토어 생성
const store = createStore(rootReducer);

ReactDOM.render(
  <React.StrictMode>
    {/* react-redux의 Provider컴포넌트로 App 컴포넌트를 감싸고, props로 store를 내린다 */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
```

<br>

#### 200406 Day 43 - 447~456p
컴포넌트와 리덕스 스토어 연동하기 (447p)
```js
// react-redux의 connect 메서드 사용
// 함수를 반환하는 makeContainer
const makeContainer = connect(
  mapStateToProps, // 리덕스 스토어 안의 상태를 컴포넌트의 props로 넘겨주기 위해 설정하는 함수, 
  mapDispatchToProps // 액션 생성 함수를 컴포넌트의 props로 넘겨주기 위해 사용하는 함수
)

// 반환된 함수에 타겟 컴포넌트를 파라미터로 넣어 리덕스와 연동된 컴포넌트를 만든다
makeContainer(/* target component */)
```
```js
// 위 코드를 익명함수 상태로 선언
export default connect(
  (state) => ({
    number: state.counter.number,
  }),
  (dispatch) => ({
    increase: () => dispatch(increase()),
    decrease: () => dispatch(decrease()),
  })
)(CounterContainer);
```
```js
// redux의 bindActionCreators 사용
export default connect(
  (state) => ({
    number: state.counter.number,
  }),
  (dispatch) => 
    bindActionCreators(
      {
        increase,
        decrease
      },
      dispatch
    )
)(CounterContainer);
```
```js
// connect의 두 번째 파라미터를 액션 생성 함수로 이루어진 객체로 전달
// connect 함수가 내부적으로 bindActionCreators 작업을 한다
export default connect(
  (state) => ({
    number: state.counter.number,
  }),
  {
    increase,
    decrease
  },
)(CounterContainer);
```
- [[ connect.js explained | Dan Abramov ]](https://gist.github.com/gaearon/1d19088790e70ac32ea636c025ba424e)
- [[ Defining mapDispatchToProps As An Object | React Redux ]](https://react-redux.js.org/using-react-redux/connect-mapdispatch#defining-mapdispatchtoprops-as-an-object)
- [[ React Redux - connect & provider | 생활코딩 ]](https://youtu.be/h5Trjjra50E)
- [[ (번역)React + Redux 플로우의 이해 | carrot useless ]](https://medium.com/@ca3rot/%EC%95%84%EB%A7%88-%EC%9D%B4%EA%B2%8C-%EC%A0%9C%EC%9D%BC-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-%EC%89%AC%EC%9A%B8%EA%B1%B8%EC%9A%94-react-redux-%ED%94%8C%EB%A1%9C%EC%9A%B0%EC%9D%98-%EC%9D%B4%ED%95%B4-1585e911a0a6)