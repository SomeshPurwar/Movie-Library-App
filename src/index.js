import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { Auth0Provider } from "@auth0/auth0-react";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
    domain="dev-hspe52b8l8xn6bao.us.auth0.com"
    clientId="vJ3feP0kzvfVMoyXkq3I65fqNTEIsVJO"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>
  </React.StrictMode>
);


