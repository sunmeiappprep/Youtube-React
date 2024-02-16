import React from 'react';
import { loginUser } from '../../utils/authUtils';
import { useNavigate } from 'react-router-dom';


function SignIn() {

  let navigate = useNavigate();
  const loginAndRedirect = async () => {
  try {
    let info = await loginUser();
    console.log(info)
    
  } catch (error) {
    console.error("Login failed:", error);
    // Handle the error appropriately
  }
}

  
  return (
    <button onClick={loginAndRedirect}>Login</button>
  );
}
export default SignIn;
