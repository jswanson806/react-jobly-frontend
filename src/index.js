import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App.js';
import * as serviceWorker from './serviceWorker.js';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './helpers/UserContext.js';
import { TokenProvider } from './helpers/TokenContext.js';

ReactDOM.render(
    <BrowserRouter>
        <UserProvider>
            <TokenProvider>
                <App />
            </TokenProvider>
        </UserProvider>
    </BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
