import React from 'react';
import ColorBox from './components/ColorBox';
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

export default App;
