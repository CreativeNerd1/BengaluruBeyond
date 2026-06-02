// Admin Authentication Service
// Uses localStorage for demo - replace with real auth in production

const AUTH_KEY = 'bengaluruBeyond_adminAuth';
const ADMIN_KEY = 'bengaluruBeyond_adminCredentials';

// Default admin credentials (in production, this would be in backend)
const DEFAULT_ADMIN = {
  username: 'admin',
  password: 'admin123', // In production, use hashed passwords
  name: 'Administrator',
  email: 'admin@bengalurubeyond.com',
};

// Initialize admin if not exists
const initializeAdmin = () => {
  if (!localStorage.getItem(ADMIN_KEY)) {
    localStorage.setItem(ADMIN_KEY, JSON.stringify(DEFAULT_ADMIN));
  }
};

// Login
export const login = async (username, password) => {
  initializeAdmin();
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const admin = JSON.parse(localStorage.getItem(ADMIN_KEY));
  
  if (admin.username === username && admin.password === password) {
    const session = {
      isAuthenticated: true,
      user: {
        username: admin.username,
        name: admin.name,
        email: admin.email,
      },
      loginTime: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
    };
    
    localStorage.setItem(AUTH_KEY, JSON.stringify(session));
    return { success: true, data: session };
  }
  
  return { success: false, error: 'Invalid username or password' };
};

// Logout
export const logout = () => {
  localStorage.removeItem(AUTH_KEY);
  return { success: true };
};

// Check if authenticated
export const isAuthenticated = () => {
  const session = localStorage.getItem(AUTH_KEY);
  if (!session) return false;
  
  const { isAuthenticated, expiresAt } = JSON.parse(session);
  if (!isAuthenticated) return false;
  
  // Check if session expired
  if (new Date(expiresAt) < new Date()) {
    localStorage.removeItem(AUTH_KEY);
    return false;
  }
  
  return true;
};

// Get current user
export const getCurrentUser = () => {
  const session = localStorage.getItem(AUTH_KEY);
  if (!session) return null;
  
  const { user, isAuthenticated } = JSON.parse(session);
  return isAuthenticated ? user : null;
};

// Update admin credentials
export const updateCredentials = async (currentPassword, newUsername, newPassword, name, email) => {
  const admin = JSON.parse(localStorage.getItem(ADMIN_KEY));
  
  if (admin.password !== currentPassword) {
    return { success: false, error: 'Current password is incorrect' };
  }
  
  const updatedAdmin = {
    ...admin,
    username: newUsername || admin.username,
    password: newPassword || admin.password,
    name: name || admin.name,
    email: email || admin.email,
  };
  
  localStorage.setItem(ADMIN_KEY, JSON.stringify(updatedAdmin));
  
  // Update session if logged in
  const session = JSON.parse(localStorage.getItem(AUTH_KEY) || '{}');
  if (session.isAuthenticated) {
    session.user = {
      username: updatedAdmin.username,
      name: updatedAdmin.name,
      email: updatedAdmin.email,
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(session));
  }
  
  return { success: true };
};

export default {
  login,
  logout,
  isAuthenticated,
  getCurrentUser,
  updateCredentials,
};
