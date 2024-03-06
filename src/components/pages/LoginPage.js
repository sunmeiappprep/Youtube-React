// LoginPage.jsx
import React, { useState,useEffect } from 'react';
import { loginUser } from '../../utils/authUtils';
import { useGlobalState } from '../../StateContext'; 
import NavBar from '../navBar/NavBar';

function LoginPage() {
  const { user,token,setUser, setToken } = useGlobalState(); // Access the context methods

  useEffect(() => {
    console.log("Updated global state user:", user);
    console.log("Updated global state token:", token);
  }, [user, token]); // This effect runs when `user` or `token` changes

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const  handleSubmit  = async (event) => {
    event.preventDefault();
    // Handle the login logic here
    let data = await loginUser("asdasd1@gmail.com", 'asdasd')
    console.log(data)
    setUser(data.user.id)
    setToken(data.jwtToken)
    // You would replace the above console.log with your login logic
  };

  const handleChange = (e) => {
    console.log(e)
      const { name, value } = e.target;
      if (name === 'username') {
          setUsername(value)
          console.log(username)
      } else if (name === 'password') {
          setPassword(value)
          console.log(username)

      }
  };

  const handleLogin = async (e) => {
    let data = await loginUser(email,password)
    console.log(data)
};

  

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="username"
            placeholder="username"
            value={username}
            onChange={(e) => handleChange(e.target.value)}
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
            onChange={(e) => handleChange(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button onClick={(e) => handleLogin}
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
