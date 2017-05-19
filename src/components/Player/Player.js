import React from 'react';

import './main.css';

export default (props) => (
  <footer className="Player__container">
    {props.children}
    <div style={{width: "180px"}}>Volume</div>
  </footer>
)
