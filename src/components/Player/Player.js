import React from 'react';

import './main.css';

export default (props) => (
  <footer className="Player__container">
    {props.children}
    <div style={{flex: 1, backgroundColor: "yellow"}}>Controls</div>
    <div>Volume</div>
  </footer>
)
