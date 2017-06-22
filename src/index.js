import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import axios from 'axios';

// console.log(process.env.NODE_ENV);

ReactDOM.render(
  <App
    url='/api'
  />,
  document.getElementById('root')
);
