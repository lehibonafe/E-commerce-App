import React, { useContext, useEffect } from "react";
import UserContext from "../UserContext";
import { Navigate } from "react-router-dom";

const Logout = () => {
  const { setUser, unsetUser } = useContext(UserContext);

  unsetUser();

  useEffect(() => {
    setUser({
      id: null,
      firstName: null,
      lastName: null,
    });
  });

  return <Navigate to="/user/login" />;
};

export default Logout;
