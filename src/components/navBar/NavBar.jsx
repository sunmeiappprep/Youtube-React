import React, { useState, useEffect } from 'react'
import SearchBar from './SearchBar'
import SubMenu from './SubMenu'
import { isAuth } from '../../utils/isAuth'
import Youtube from "../../assets/images/y3.png"
import { useGlobalState } from '../../StateContext'
import { useNavigate } from 'react-router-dom'
import { checkJWT, logOut } from '../../utils/authUtils'

function NavBar() {
  const { user, token, setUser, setToken,setUserUsername,isAuthenticated, setIsAuthenticated,showSubMenu} = useGlobalState();
  const [login, setLogin] = useState("")
  const navigate = useNavigate()
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  const handleLogOut = async (event) => {
    event.preventDefault();
    await deleteInfo();
    navigate("/signin");
  };

  const deleteInfo = async () => {
    await logOut();
    setUser("");
    setToken("");
    setUserUsername("");
  };

  const handleLogin = () => {
    navigate("/signin")
  }

  const handleUserPageRedirect = () => {
  navigate(`/user/${user}`);
}

useEffect(() => {
    const verifyToken = async () => {
      const result = await checkJWT();
      setIsAuthenticated(result);
      if (!result) {
        console.log(result)
        await deleteInfo();
      }
    };

    verifyToken();
  }, [user, token, setIsAuthenticated]);




  const handleHomepageRedirect = () => {
    if (window.location.pathname !== "/") {
      navigate("/")
    }
  }

  return (
  <div className="flex justify-between items-center w-full px-4 py-2 z-50">
    <div className="flex gap-4 items-center flex-shrink-0">
        {!showSubMenu && (
          <>
            <SubMenu className="" />
            <img onClick={handleHomepageRedirect} src={Youtube} className="ml-8 h-12 w-24" alt="YouTube" />
          </>
        )}
      </div>
    <div className="flex-grow mx-4">
      <SearchBar className="max-w-screen-md w-full" style={{ maxWidth: '600px' }} />
    </div>
    <div className="flex gap-4 flex-shrink-0">
    {isAuthenticated && (
        <button onClick={handleUserPageRedirect} className="px-4 py-1 text-sm font-semibold text-white bg-blue-500 hover:bg-blue-600 rounded">User Page</button>
      )}
      {isAuthenticated === null ? (
        <button className="px-4 py-1 text-sm font-semibold text-white bg-gray-500 rounded">Loading...</button>
      ) : (
        !isAuthenticated ? (
          <button onClick={handleLogin} className="px-4 py-1 text-sm font-semibold text-white bg-green-500 hover:bg-green-600 rounded">Login</button>
        ) : (
          <button onClick={handleLogOut} className="px-4 py-1 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 rounded">Logout</button>
        )
      )}
    </div>
  </div>
);
}

export default NavBar
