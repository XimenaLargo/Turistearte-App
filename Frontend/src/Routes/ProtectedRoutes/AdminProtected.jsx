import { Navigate, Outlet } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { getSessionStorage } from '../../Components/utils/services/Storage';

const AdminProtected = () => {
  const [user, setUser] = useState(null);
  const [isAdminUser,setIsAdminUser] = useState(false)
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = getSessionStorage("CURRENT_USER_DETAILS");
      setUser(currentUser);
      currentUser.role == "ROLE_ADMIN" ? setIsAdminUser(true) :setIsAdminUser(false)
      setLoading(false);
    };

    fetchUser();
  }, []);
  if (isLoading) {
    return null;
  }

  if (!isAdminUser) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default AdminProtected;
