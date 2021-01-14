import React from 'react';
import ReactDOM from 'react-dom';
import './bootstrap-override.scss';
import UserSignUpPage from "./pages/UserSignUpPage";
import UserLoginPage from "./pages/UserLoginPage";

ReactDOM.render(
  <React.StrictMode>
    <UserLoginPage />
  </React.StrictMode>,
  document.getElementById('root')
);

