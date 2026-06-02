import { createContext, useContext, useState, useEffect } from 'react';
import { isAuthenticated, getCurrentUser, login, logout } from '../services/authService';

const AdminContext = createContext(null);

export const AdminProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication on mount
    if (isAuthenticated()) {
      setUser(getCurrentUser());
    }
    setLoading(false);
  }, []);

  const handleLogin = async (username, password) => {
    const result = await login(username, password);
    if (result.success) {
      setUser(result.data.user);
    }
    return result;
  };

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login: handleLogin,
    logout: handleLogout,
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export default AdminContext;
