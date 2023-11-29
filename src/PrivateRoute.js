import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const isAuthenticated = () => {
    return localStorage.getItem('userId') !== null;
};

const PrivateRoute = ({ children, ...rest }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

export default PrivateRoute;

