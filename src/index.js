import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import axios from 'axios';

ReactDOM.render(
  <App 
   url='/api/news'
   pollInterval={2000}
  />,
  document.getElementById('root')
);
