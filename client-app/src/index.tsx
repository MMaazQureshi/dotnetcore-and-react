import React from 'react';
import ReactDOM from 'react-dom';
import './app/layout/styles.css';
import {Router} from 'react-router-dom';
import {createBrowserHistory}  from 'history';
import App from './app/layout/App';
import * as serviceWorker from './serviceWorker';
import ScrollToTop from './app/layout/ScrollToTop';
import 'mobx-react-lite/batchingForReactDom'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
export const history = createBrowserHistory();

ReactDOM.render(
  // <React.StrictMode>

  <Router history={history}>
    <ScrollToTop />
    <App />
    
    </Router>
  // </React.StrictMode>
  ,
  document.getElementById('root')
);
 
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
