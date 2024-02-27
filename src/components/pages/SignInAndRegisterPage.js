import React from 'react';
import { loginUser } from '../../utils/authUtils';
import { useGlobalState } from '../../StateContext';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
function SignInPage() {
    const { user, token, setUser, setToken } = useGlobalState(); // Access the context methods
    const navigate = useNavigate()

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleDemoSignIn = async (event) => {
        event.preventDefault();
        // Handle the login logic here
        let data = await loginUser("asdasd1@gmail.com", 'asdasd')
        if (data.user.id && data.jwtToken) {
            setUser(data.user.id)
            setToken(data.jwtToken)
            navigate("/")
        }

    }

    const handleChange = (e) => {
        console.log(e)
        const { name, value } = e.target;
        if (name === 'username') {
            setUsername(value)
            console.log(username)
        } else if (name === 'password') {
            setPassword(value)
            console.log(password)

        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        let data = await loginUser(username, password)
        if(data.user.id && data.jwtToken){
            setUser(data.user.id)
            setToken(data.jwtToken)
            navigate("/")
        }
    };




    useEffect(() => {
        console.log("Updated global state user:", user);
        console.log("Updated global state token:", token);
    }, [user, token]); // This effect runs when `user` or `token` changes

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Sign in to your account
                    </h2>
                </div>
                <form className="mt-8 space-y-6" action="#" method="POST">
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="username" className="sr-only">Username</label>
                            <input onChange={(e) => handleChange(e)} id="username" name="username" type="text" autoComplete="username" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Username" />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input onChange={(e) => handleChange(e)} id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <button onClick={handleLogin} type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Sign in
                        </button>
                        <button type="button" onClick={handleDemoSignIn} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                            Demo User
                        </button>
                    </div>

                    <div className="text-center">
                        <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Don't have an account? Register
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignInPage;
