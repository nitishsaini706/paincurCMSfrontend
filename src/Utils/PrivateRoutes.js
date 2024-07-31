import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { token } = useContext(AuthContext);
  if (token === undefined || token === null || token === "undefined") {
    return <Navigate to="/login" replace />;
}

return children;
};

export default PrivateRoute;