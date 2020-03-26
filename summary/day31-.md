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