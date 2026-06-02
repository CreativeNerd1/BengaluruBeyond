// Admin Authentication Service
// Uses backend JWT authentication

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5077/api';
const AUTH_KEY = 'bengaluruBeyond_adminAuth';
const TOKEN_KEY = 'admin_token';

// Login via backend API
export const login = async (username, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    
    const result = await response.json();
    
    if (result.success && result.data?.token) {
      // Store JWT token securely
      localStorage.setItem(TOKEN_KEY, result.data.token);
      
      const session = {
        isAuthenticated: true,
        user: {
          username: result.data.username,
          name: result.data.fullName || result.data.username,
          role: result.data.role,
        },
        loginTime: new Date().toISOString(),
        expiresAt: result.data.expiresAt,
      };
      
      localStorage.setItem(AUTH_KEY, JSON.stringify(session));
      return { success: true, data: session };
    }
    
    return { success: false, error: result.message || 'Invalid credentials' };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: 'Network error. Please try again.' };
  }
};

// Logout
export const logout = () => {
  localStorage.removeItem(AUTH_KEY);
  localStorage.removeItem(TOKEN_KEY);
  return { success: true };
};

// Check if authenticated
export const isAuthenticated = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  const session = localStorage.getItem(AUTH_KEY);
  
  if (!token || !session) return false;
  
  try {
    const { isAuthenticated, expiresAt } = JSON.parse(session);
    if (!isAuthenticated) return false;
    
    // Check if session expired
    if (new Date(expiresAt) < new Date()) {
      logout();
      return false;
    }
    
    return true;
  } catch {
    logout();
    return false;
  }
};

// Get current user
export const getCurrentUser = () => {
  const session = localStorage.getItem(AUTH_KEY);
  if (!session) return null;
  
  try {
    const { user, isAuthenticated } = JSON.parse(session);
    return isAuthenticated ? user : null;
  } catch {
    return null;
  }
};

// Get auth token for API calls
export const getAuthToken = () => localStorage.getItem(TOKEN_KEY);

// Update admin credentials via backend
export const updateCredentials = async (currentPassword, newUsername, newPassword, name, email) => {
  try {
    const token = getAuthToken();
    if (!token) {
      return { success: false, error: 'Not authenticated' };
    }
    
    const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        currentPassword,
        newPassword: newPassword || currentPassword,
        newUsername,
        name,
        email,
      }),
    });
    
    const result = await response.json();
    
    if (result.success) {
      // Update local session
      const session = JSON.parse(localStorage.getItem(AUTH_KEY) || '{}');
      if (session.isAuthenticated && session.user) {
        session.user.username = newUsername || session.user.username;
        session.user.name = name || session.user.name;
        localStorage.setItem(AUTH_KEY, JSON.stringify(session));
      }
      return { success: true };
    }
    
    return { success: false, error: result.message || 'Failed to update credentials' };
  } catch (error) {
    console.error('Update credentials error:', error);
    return { success: false, error: 'Network error. Please try again.' };
  }
};

export default {
  login,
  logout,
  isAuthenticated,
  getCurrentUser,
  getAuthToken,
  updateCredentials,
};
