import React, { useCallback, useState, useRef } from "react";
import produce from "immer";

function App() {
  const nextId = useRef(1);
  const [form, setForm] = useState({ username: "", name: "" });
  const [names, setNames] = useState({
    array: [],
    uselessValue: null
  });

  const onChange = useCallback(e => {
    const { name, value } = e.target;
    setForm(
      produce(draft => {
        draft[name] = value;
      })
    );
  }, []);

  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      const data = {
        id: nextId.current,
        ...form
      };

      setNames(
        produce(draft => {
          draft.array.push(data);
        })
      );

      setForm({
        username: "",
        name: ""
      });

      nextId.current = nextId.current + 1;
    },
    [form]
  );

  const onRemove = useCallback(id => {
    setNames(
      produce(draft => {
        const targetIndex = draft.array.findIndex(name => name.id === id);
        draft.array.splice(targetIndex, 1);
      })
    );
  }, []);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input placeholder="아이디" name="username" value={form.username} onChange={onChange} />
        <input placeholder="이름" name="name" value={form.name} onChange={onChange} />
        <button type="submit">등록</button>
      </form>
      <ul>
        {names.array.map(name => (
          <li key={name.id} onClick={() => onRemove(name.id)}>
            {name.username}({name.name})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
