import React from 'react';
import { registerUser } from '../../utils/authUtils';
function Register() {
    return (
        <button className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={registerUser}>Register</button>
      );
}
export default Register;
