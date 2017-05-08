import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

// import './Featured.css';

class Featured extends Component {
  render() {
    return (
      <div className="Featured">
        Featured<br/>
        <Link to={"/"}>
          Home
        </Link>
      </div>
    );
  }
}

export default Featured;
