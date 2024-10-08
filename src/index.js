import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from "./rootReducer";
import { Helmet } from 'react-helmet';
import { Provider } from 'react-redux';
import "./translations/i18n";
import {BrowserRouter} from "react-router-dom";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

//description:
//This code is a workaround for a bug in Internet Explorer Mobile 10.0, where the viewport size is not calculated properly. The code detects if the user agent matches this version of IE Mobile and then injects a style tag into the HTML head, which sets the width of the viewport to "auto!important", overriding any previous CSS rules. This fixes the bug and allows the page to be displayed correctly on IE Mobile 10.0.
if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
    var msViewportStyle = document.createElement('style');
    msViewportStyle.appendChild(
        document.createTextNode(
            '@-ms-viewport{width:auto!important}'
        )
    );
    document.head.appendChild(msViewportStyle);
}

const root = createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <div>
        <Helmet>
          <link
            id="favicon"
            rel="icon"
            href="/app_static/favicon.png"
            type="image/x-icon"
            />
        </Helmet>
      </div>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);