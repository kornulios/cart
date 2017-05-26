import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';


ReactDOM.render(
  <App 
   url='http://localhost:3001/api/news'
   pollInterval={2000}
  />,
  document.getElementById('root')
);
