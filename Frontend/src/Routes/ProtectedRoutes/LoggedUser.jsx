import { Navigate, Outlet } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { getSessionStorage } from '../../Components/utils/services/Storage';

const LoggedUser = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect( () => {
    const fetchUser = async () => {
      const currentUser = getSessionStorage("CURRENT_USER_DETAILS");
      setUser(currentUser);
      setLoading(false);
    };

    fetchUser();
  }, []);

  if (isLoading) {
    return null;
  }
  
  if (user == null) {
    return <Navigate to='/login' />;
}

  return <Outlet />;
};

export default LoggedUser;
