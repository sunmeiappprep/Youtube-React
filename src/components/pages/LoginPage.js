// LoginPage.jsx
import React, { useState } from 'react';
import { loginUser } from '../../utils/authUtils';
import { useGlobalState } from '../../StateContext'; 

function LoginPage() {
  const { user,token,setUser, setToken } = useGlobalState(); // Access the context methods
  console.log(user, token)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const  handleSubmit  = async (event) => {
    event.preventDefault();
    // Handle the login logic here
    let data = await loginUser(email, password)
    console.log(data)
    setUser(data.user.id)
    setToken(data.jwtToken)
    console.log("Global state user:", user);
    console.log("Global state token:", token);
    // You would replace the above console.log with your login logic
  };

  

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
