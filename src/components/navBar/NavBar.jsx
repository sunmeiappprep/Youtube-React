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
import { getColorFromInitial } from '../../utils/getColorFromInitial'
function NavBar() {
  const { user, token, setUser, setToken,setUserUsername,isAuthenticated, setIsAuthenticated,showSubMenu,userUsername} = useGlobalState();
  const [login, setLogin] = useState("")
  const navigate = useNavigate()
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
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
        // console.log(result,"auth fail")
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

    const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : '';
  };


  const initial = getInitial(userUsername);
  const circleColor = getColorFromInitial(initial); 

  return (
    <div className="flex justify-between items-center w-full px-2 py-2 md:px-4 md:py-2 z-50">
      <div className="flex gap-2 md:gap-4 items-center flex-shrink-0">
        {!showSubMenu && (
          <>
            <SubMenu className="" />
            <img onClick={handleHomepageRedirect} src={Youtube} className="ml-2 md:ml-8 h-8 md:h-12 w-16 md:w-24" alt="YouTube" />
          </>
        )}
      </div>
      <div className="flex-grow mx-2 md:mx-4 flex justify-center md:justify-start">
        <SearchBar />
      </div>
      <div className="flex gap-2 md:gap-4 items-center flex-shrink-0 mt-2">
        {(isAuthenticated === true) ? (
          <button onClick={handleUpload} className="w-8 md:w-10 h-8 md:h-10 rounded-full bg-custom-dark hover:bg-gray-600">
            <FontAwesomeIcon icon={faUpload} className="text-white" />
          </button>
        ) : null}
        {isAuthenticated === null ? (
          <button className="w-8 md:w-10 h-8 md:h-10 rounded-full bg-gray-500">
            <FontAwesomeIcon icon={faSpinner} className="text-white" />
          </button>
        ) : !isAuthenticated ? (
          <button onClick={handleLogin} className="w-8 md:w-10 h-8 md:h-10 rounded-full bg-custom-dark hover:bg-gray-600">
            <FontAwesomeIcon icon={faUser} className="text-white" />
          </button>
        ) : (
          <div
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {isHovered ? (
              <button onClick={handleLogOut} className="w-10 md:w-10 h-8 md:h-10 rounded-full mr-4 bg-custom-dark hover:bg-gray-600 flex items-center justify-center">
                <FontAwesomeIcon icon={faSignOutAlt} className="text-white" />
              </button>
            ) : (
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center mr-4"
                style={{ backgroundColor: circleColor }}
              >
                <span className="text-white font-bold text-lg">{initial}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}


export default NavBar
