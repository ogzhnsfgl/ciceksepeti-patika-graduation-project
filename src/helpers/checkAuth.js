const checkAuth = () => {
  if (localStorage.getItem('isAuthenticated')) {
    return true;
  }
  return false;
};

export default checkAuth;
