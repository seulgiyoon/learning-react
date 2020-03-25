import React, { useState, useCallback } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState('Hello');
  // const getData = useCallback(() => {
  //   axios
  //     .get('https://jsonplaceholder.typicode.com/todos/1')
  //     .then(result => setData(result.data))
  //     .catch(error => console.error(error));
  // }, []);

  const getData = async () => {
    try {
      const result = await axios.get(
        'https://jsonplaceholder.typicode.com/todos/1',
      );
      setData(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={getData}>불러오기</button>
      <div>
        <textarea rows={7} value={JSON.stringify(data, null, 2)} readOnly />
      </div>
    </div>
  );
}

export default App;
