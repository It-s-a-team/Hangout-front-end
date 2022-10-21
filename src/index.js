import React from 'react';
import ReactDOM from 'react-dom';
// import auth0 dependencies
import { Auth0Provider } from "@auth0/auth0-react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css'
import App from './modules/App';


ReactDOM.render(
  
  
  <Auth0Provider
  
    domain={ process.env.REACT_APP_AUTH_DOMAIN }
    clientId={ process.env.REACT_APP_AUTH_CLIENT_ID }
    redirectUri={ process.env.REACT_APP_AUTH_REDIRECT_URI }
  >
    
    <App />
    
  </Auth0Provider>,
  document.getElementById('root')
   
);


