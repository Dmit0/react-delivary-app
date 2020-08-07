import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {BrowserRouter as Router}from 'react-router-dom'
import './css/content.css';
import * as serviceWorker from './serviceWorker';
import {rootReducer} from './redux/reducers/rootReducer';
import {useRoutes} from './routes'

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);

const routes=useRoutes()//передавать гость юзер либо если это какой либо из админов передавать мэнеджмент

ReactDOM.render(
  
  <React.StrictMode>
     <Provider store={store}>
      <Router>
          {routes}
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
