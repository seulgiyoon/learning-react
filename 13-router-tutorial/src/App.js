import React from 'react';
import './App.css';
import { Route, Link } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Profile from './Profile';

function App() {
  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/profile/sgyoon">윤슬기 프로필</Link></li>

        </ul>
      </nav>
      <Route exact path="/" component={Home} />
      <Route path={["/about", "/info" ]} component={About} />
      <Route path="/profile/:username" component={Profile} />
    </div>
  );
}

export default App;
