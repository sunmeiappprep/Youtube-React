import React from 'react';
import { registerUser } from '../../utils/authUtils';
function Register() {
  return (
    <button>{registerUser}</button>
  );
}
export default Register;
