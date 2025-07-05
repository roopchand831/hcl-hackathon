import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const ProtectedRoute = ({ children, allowedRoles }) => {

  const accessTokenData = JSON.parse(localStorage.getItem('AceessTokenData'));

  const isAuthenticated = accessTokenData.token;

  const navigate = useNavigate();

 useEffect(() => {
  
   // If user is not authenticated, redirect to login
  if (!isAuthenticated) {
    navigate('/forbidden');
  }

  const role=accessTokenData.role;
  console.log(isAuthenticated, role, allowedRoles, role!==allowedRoles )
  // If the user does not have the required role, redirect to forbidden page or home
  if (!allowedRoles.includes(role)) {
        navigate('/forbidden');
  }
 }, [])

  return children; // If authenticated and has required role, render the protected component
};

export default ProtectedRoute;
