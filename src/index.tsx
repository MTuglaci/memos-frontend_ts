import React from 'react';
import ReactDOM from 'react-dom';
import './bootstrap-override.scss';
import UserSignUpPage from "./pages/UserSignUpPage";

ReactDOM.render(
  <React.StrictMode>
    <UserSignUpPage />
  </React.StrictMode>,
  document.getElementById('root')
);

