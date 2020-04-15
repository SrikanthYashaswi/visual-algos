import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './stylesheet/prettylist.css';
import './stylesheet/inputholder.css';
import './stylesheet/rootapp.css';
import './stylesheet/numberview.css';
import './stylesheet/numberbar.css';
import './stylesheet/sortingalgo.css';
import './stylesheet/appheader.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
