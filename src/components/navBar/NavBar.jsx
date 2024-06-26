import React, { useState, useEffect } from 'react'
import SearchBar from './SearchBar'
import SubMenu from './SubMenu'
import { isAuth } from '../../utils/isAuth'
import Youtube from "../../assets/images/y3.png"
import { useGlobalState } from '../../StateContext'
import { useNavigate } from 'react-router-dom'
import { checkJWT, logOut } from '../../utils/authUtils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faUser , faSignOutAlt,faSpinner  } from '@fortawesome/free-solid-svg-icons';

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
    navigate("/login");
  };

  const deleteInfo = async () => {
    await logOut();
    setUser("");
    setToken("");
    setUserUsername("");
    setIsAuthenticated(false)
  };

  const handleLogin = () => {
    navigate("/login")
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


  const handleUpload = () => {
    navigate('/upload'); 
  };

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
    <div className="flex gap-4 items-center flex-shrink-0">
    <button onClick={handleUpload} className="w-10 h-10 rounded-full bg-custom-black hover:bg-gray-600">
      <FontAwesomeIcon icon={faUpload} className="text-white" />
    </button>
    {isAuthenticated === null ? (
      <button className="w-10 h-10 rounded-full bg-gray-500">
        <FontAwesomeIcon icon={faSpinner} className="text-white" />
      </button>
    ) : !isAuthenticated ? (
      <button onClick={handleLogin} className="w-10 h-10 rounded-full bg-custom-black hover:bg-gray-600">
        <FontAwesomeIcon icon={faUser } className="text-white" />
      </button>
    ) : (
      <button onClick={handleLogOut} className="w-10 h-10 rounded-full bg-custom-black hover:bg-gray-600">
        <FontAwesomeIcon icon={faSignOutAlt} className="text-white" />
      </button>
    )}
  </div>
  </div>
);
}

export default NavBar
