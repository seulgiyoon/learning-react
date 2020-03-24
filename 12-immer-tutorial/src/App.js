import React, { useCallback, useState, useRef } from "react";

function App() {
  const nextId = useRef(1);
  const [form, setForm] = useState({ username: "", name: "" });
  const [names, setNames] = useState({
    array: [],
    uselessValue: null
  });

  const onChange = useCallback(e => {
    const { name, value } = e.target;
    setForm(form => {
      return { ...form, [name]: [value] };
    });
  }, []);

  const onSubmit = useCallback(e => {
    e.preventDefault();
    const data = {
      id: nextId.current,
      ...form
    };

    setNames((names) => {
      return {
        ...names,
        array: names.array.concat(data)
      };
    });

    setForm({
      username: '',
      name: '',
    });

    nextId.current = nextId.current + 1;
  }, [form]);

  const onRemove = useCallback(id => {
    setNames(names => {
      return {
        ...names,
        array: names.array.filter(name => name.id !== id)
      };
    });
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
