import React, { useState } from 'react'
import SearchBar from './SearchBar'
import SubMenu from './SubMenu'
import { isAuth } from '../../utils/isAuth'
import Youtube from "../../assets/images/youtube2.png"
import { useGlobalState } from '../../StateContext'
import { useNavigate } from 'react-router-dom'
import { logOut } from '../../utils/authUtils'
import { useEffect } from 'react'
function NavBar() {
  const { user, token, setUser, setToken } = useGlobalState(); // Access the context methods
    const navigate = useNavigate()
   
    const handleLogOut = async (event) => {
        event.preventDefault();
        // Handle the login logic here
        let data = await logOut()
        setToken("")

    }

    const handleLogin = () => {
      navigate("signin")
    }
    useEffect(() => {
    console.log("Updated global state user:", user);
    console.log("Updated global state token:", token);
  }, [user, token]); // This effect runs when `user` or `token` changes

  return (
    <div className="flex justify-between items-center w-full px-4 py-2">
      <div className="flex gap-4">
      <SubMenu/>
      <img src={Youtube} className="h-6 w-18" alt="YouTube" />
      </div>
      <div>
      <SearchBar className="max-w-screen-md"  />  {/* SearchBar will take the available space but won't be exactly centered due to other elements taking space too */}
      </div>
      {!token ? (
        <div className="flex gap-4"> {/* Show when not authenticated */}
        <button onClick={handleLogin} className="px-4 py-1 text-sm font-semibold text-white bg-green-500 hover:bg-green-600 rounded" >Login</button>
        </div>
      ) : (
        <div className="flex gap-4"> {/* Show when authenticated */}
        <button onClick={handleLogOut} className="px-4 py-1 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 rounded">Logout</button>
        </div>
      )}
    </div>
  );
}
export default NavBar
