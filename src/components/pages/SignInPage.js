import React, { useState, useEffect } from 'react';
import { loginUser } from '../../utils/authUtils';
import { useGlobalState } from '../../StateContext';
import { useNavigate } from 'react-router-dom';
import NavBar from '../navBar/NavBar';
import Sidebar from '../navBar/Sidebar';

function SignInPage() {
  const { setUser, setToken, setUserUsername,setShowSubMenu,setIsAuthenticated,showSubMenu  } = useGlobalState();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  useEffect(() =>{
    setShowSubMenu(false)
  },[])

  const handleDemoSignIn = async (event) => {
    event.preventDefault();
    let data = await loginUser("asdasd1@gmail.com", 'asdasd');
    if (data?.user?.id && data?.jwtToken) {
      setUser(data.user.id);
      setToken(data.jwtToken);
      setUserUsername(data.user.username);
      navigate("/");
    }
  };

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    let data = await loginUser(username, password);
    if (data?.user?.id && data?.jwtToken) {
      setUser(data.user.id);
      setToken(data.jwtToken);
      setUserUsername(data.user.username);
      setIsAuthenticated(true)
      navigate("/");
    }
    else{
        setErrorMessage('Invalid credentials');
    }
  };

  const handleRegister =() => {
    console.log("register")
    navigate("/register")
  }
  return (
    <div className="min-h-screen bg-custom-dark flex">
      <div className={`${showSubMenu ? 'w-full md:w-64' : 'w-0'} transition-all duration-300`}>
        <Sidebar />
      </div>
      <div className="flex-grow flex flex-col">
        <NavBar />
        <div className="flex flex-grow items-center justify-center">
          <div className="max-w-md w-full space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                Sign in to your account
              </h2>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleLogin}>
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="username" className="sr-only">Username</label>
                  <input
                    onChange={handleChangeUsername}
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-400 text-white bg-gray-800 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Username"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">Password</label>
                  <input
                    onChange={handleChangePassword}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-400 text-white bg-gray-800 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                  />
                </div>
              </div>

              {errorMessage && (
                <div className="text-red-500 text-sm mt-2 text-center">
                  {errorMessage}
                </div>
              )}

              <div className="space-y-2">
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign in
                </button>
                <button
                  type="button"
                  onClick={handleDemoSignIn}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Demo User
                </button>
              </div>

              <div className="text-center">
                <div onClick={handleRegister} className="font-medium text-indigo-400 hover:text-indigo-300">
                  Don't have an account? Register
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;