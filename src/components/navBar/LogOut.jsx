import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../utils/authUtils';
function LogOut() {
  let navigate = useNavigate();
  const deleteTokenRedirect = () => {
    logOut()
    navigate("/")
  }

  return (
    <button onClick={deleteTokenRedirect}>Log Out</button>
  );
}
export default LogOut;
