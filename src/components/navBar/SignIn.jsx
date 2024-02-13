import React from 'react';
import { loginUser } from '../../utils/authUtils';
function SignIn() {
  return (
    <button onClick={loginUser}>Login</button>
  );
}
export default SignIn;
