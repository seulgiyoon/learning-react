import React, { useState, useCallback } from 'react';
import axios from 'axios';
import NewsList from './components/NewsList';

function App() {
  const [data, setData] = useState('Hello');

  const getData = async () => {
    try {
      const result = await axios.get(
        `http://newsapi.org/v2/top-headlines?country=kr&apiKey=${process.env.REACT_APP_NEWS_KEY}`,
      );
      setData(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  return <NewsList />;
}

export default App;
