import { Navigate, Outlet } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { getSessionStorage } from '../../Components/utils/services/Storage';

const LoginAndRegister = () => {
  const [user, setUser] = useState(null);


  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = getSessionStorage("CURRENT_USER_DETAILS");
      setUser(currentUser);
    };

    fetchUser();
  }, []);

 
  if (user !==null) {
    return <Navigate to='/home' />;
}

  return <Outlet />;
};

export default LoginAndRegister;
