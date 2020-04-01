import React from 'react';
import ColorBox from './components/ColorBox';
import { ColorProvider } from './contexts/color';
import SelectColors from './components/SelectColors';

function App() {
  return (
    // Provider 사용 시 항상 value를 부여한다.
    <ColorProvider>
      <SelectColors />
      <ColorBox />
    </ColorProvider>
  );
}

export default App;
