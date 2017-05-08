import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import App from './App';
import Featured from './Featured';
import TopNavbar from './TopNavbar';
import './index.css';

ReactDOM.render(
  <Router>
    <div>
      <TopNavbar />
      <Route exact path="/" component={App} />
      <Route path="/featured" component={Featured} />
    </div>
  </Router>,
  document.getElementById('root')
);
