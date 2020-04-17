import React, { useState } from 'react';
import loadable from '@loadable/component';

const SplitMe = loadable(() => import('./SplitMe'), {
  fallback: <div>로딩 중...</div>
});

function App() {
  const [visible, setVisible] = useState(false);
  const onClick = () => {
    setVisible(true);
  };
  const onMouseOver = () => {
    // 버튼에 마우스를 올린 시점부터 컴포넌트를 미리 불러온다
    SplitMe.preload();
  };
  
  return (
    <div>
      <button 
        onClick={onClick}
        onMouseOver={onMouseOver}
      >
        Click
      </button>
      {visible && <SplitMe />}
    </div>
  );
}

export default App;
