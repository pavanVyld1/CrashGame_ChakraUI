import React from "react";
import { useNavigate } from "react-router-dom";

interface PrivateRouteProps {
  children: JSX.Element;
}

const isAuthenticated = () => {
const instance = process.env.REACT_APP_INSTANCE;
console.log(instance,"instanceinstance")
  const token = localStorage.getItem(`${instance}_JWTtoken`);
  const name = localStorage.getItem(`${instance}_username`);
console.log(token,"tokenn",!token)
  return !!token;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const navigate = useNavigate();
  if (!isAuthenticated()) {
    return navigate('/home');
  }
  return children;
};

export default PrivateRoute;