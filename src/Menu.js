import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Menu extends Component {
  render() {
    return (
      <div className='App-menu'>
        <ul>
          <li><Link to="/">News</Link></li>
          <li><Link to="/schedule">Schedule</Link></li>
          <li><Link to="/table">Table</Link></li>
          <li><Link to="/admin">Admin</Link></li>
        </ul>
      </div>
    );
  }
}

export default Menu;