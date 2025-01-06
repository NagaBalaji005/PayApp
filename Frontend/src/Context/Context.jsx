import React, { createContext, useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// Create context with default values
export const AuthContext = createContext({
  user: null,
  users: null,
  setUser: () => {},
  setUsers: () => {},
  logout: () => {},
  isAuthenticated: false,
});
export const useAuth = () => useContext(AuthContext);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();
  // Initialize authentication state
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedToken = localStorage.getItem('authToken');
        const storedUserData = localStorage.getItem('user');

        // If token and user data exist, set the authentication state
        if (storedToken && storedUserData) {
          const parsedToken = JSON.parse(storedToken);
          const parsedUserData = JSON.parse(storedUserData);

          setUser(parsedToken);
          setUsers(parsedUserData);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error initializing auth state:', error);
        // Clear corrupted data from local storage
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
      }
    };
    initializeAuth();
  }, []);

  // Handle user logout
  const logout = () => {
    try {
      // Clear local storage and reset state
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      setUser(null);
      setUsers(null);
      setIsAuthenticated(false);

      // Redirect to home page
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  // Update user state and local storage
  const updateUser = (newUser) => {
    try {
      setUser(newUser);
      if (newUser) {
        localStorage.setItem('authToken', JSON.stringify(newUser));
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  // Update users state and local storage
  const updateUsers = (newUsers) => {
    try {
      setUsers(newUsers);
      if (newUsers) {
        localStorage.setItem('user', JSON.stringify(newUsers));
      }
    } catch (error) {
      console.error('Error updating users:', error);
    }
  };
  // Context value to provide to children components
  const contextValue = {
    user,
    users,
    setUser: updateUser,
    setUsers: updateUsers,
    logout,
    isAuthenticated,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
