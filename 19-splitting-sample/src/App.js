import React, { useState, Suspense } from 'react'

function App() {
  const [visible, setVisible] = useState(false);
  const SplitMe = React.lazy(() => import('./SplitMe'));
  
  return (
    <div>
      <button onClick={() => setVisible(true)}>Click</button>
      <Suspense fallback={<div>로딩중...</div>}>
        {visible && <SplitMe />}
      </Suspense>
    </div>
  )
}

export default App

// class 형태
// import React, { Component, Suspense } from 'react'

// export default class App extends Component {
//   state = {
//     SplitMe: null
//   }

//   handleClick = () => {
//     const contents = React.lazy(() => import('./SplitMe'));
//     this.setState({
//       SplitMe: contents
//     })
//   } 

//   render() {
//     const { SplitMe } = this.state
//     return (
//       <div>
//         <button onClick={this.handleClick}>Click</button>
//         <Suspense fallback={<div>로딩중...</div>}>
//           {SplitMe && <SplitMe />}
//         </Suspense>
//       </div>
//     )
//   }
// }
