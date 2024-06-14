import React from 'react';
import { loginUser,registerUser } from '../../utils/authUtils';
import { useGlobalState } from '../../StateContext'; 
import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../navBar/NavBar';
function RegisterUserPage() {
    const { user, token, setUser, setToken,setUserUsername } = useGlobalState(); // Access the context methods
    const navigate = useNavigate()
    
    const handleDemoSignIn = async (event) => {
        event.preventDefault();
        // Handle the login logic here
        let data = await loginUser("asdasd1@gmail.com", 'asdasd')
        if(data.user.id && data.jwtToken){
            setUser(data.user.id)
            setToken(data.jwtToken)
            navigate("/")
        }

    }

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'username') {
            setUsername(value)
            
        } else if (name === 'password') {
            setPassword(value)
        }
    };

    

    // Handle form submission
    const handleSubmit =  async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        // Here you can handle the submission, for example, sending the data to a server
        const response = await registerUser(username,password)
        if (response.data){
          console.log(response.data)
          let data = await loginUser(username, password)
          if(data.user.id && data.jwtToken){
              setUser(data.user.id)
              setToken(data.jwtToken)
              setUserUsername(data.user.username)
              navigate("/")
          }
        }
        else{
          setErrorMessage(response.error);
        }
        // Implement your submission logic here, e.g., calling an API
    };

    useEffect(() => {
        console.log("Updated global state user:", user);
        console.log("Updated global state token:", token);
    }, [user, token]); // This effect runs when `user` or `token` changes

    return (
        <div className="min-h-screen bg-custom-dark flex flex-col">
          <NavBar />
          <div className="flex flex-grow items-center justify-center">
            <div className="max-w-md w-full space-y-8">
              <div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                  Register an account
                </h2>
              </div>
              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="rounded-md shadow-sm -space-y-px">
                  <div>
                    <label htmlFor="username" className="sr-only">Username</label>
                    <input 
                      onChange={(e) => handleChange(e)} 
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
                      onChange={(e) => handleChange(e)} 
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
                    onClick={(e) => handleSubmit(e)} 
                    type="submit" 
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Register
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
                  <a href="/signin" className="font-medium text-indigo-400 hover:text-indigo-300">
                    Have an account? Sign In
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    };
    
    export default RegisterUserPage;
    