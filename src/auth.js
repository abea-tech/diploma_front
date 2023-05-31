import axios from 'axios';

// Function to store the access token in localStorage
const storeAccessToken = (token) => {
  localStorage.setItem('accessToken', token);
};

// Function to retrieve the access token from localStorage
const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

// Function to remove the access token from localStorage
const removeAccessToken = () => {
  localStorage.removeItem('accessToken');
};

// Function to set the access token in axios headers
const setAccessTokenHeader = (token) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

// Function to remove the access token from axios headers
const removeAccessTokenHeader = () => {
  delete axios.defaults.headers.common['Authorization'];
};

const logout = () => {
    // Remove the access token from localStorage
    removeAccessToken();
  
    // Remove the access token from axios headers
    removeAccessTokenHeader();
  
    // Handle logout, e.g., redirect to login page
    // ...
  };

export { logout, getAccessToken, setAccessTokenHeader, storeAccessToken };
