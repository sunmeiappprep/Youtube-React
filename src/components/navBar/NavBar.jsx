import React, { useState } from 'react'
import Register from './Register'
import SignIn from './SignIn'
import SearchBar from './SearchBar'
import SubMenu from './SubMenu'
import LinkButton from './LinkButton'
import { isAuth } from '../../utils/isAuth'
import LogOut from './LogOut'
function NavBar() {
  console.log(isAuth())

  return (
    <div className="flex justify-between items-center w-full px-4 py-2">
      <div className="flex gap-4">
      <SubMenu/>
      <SubMenu/>
      </div>
      <SearchBar className="flex-grow" /> {/* SearchBar will take the available space but won't be exactly centered due to other elements taking space too */}
      {!isAuth() ? (
        <div className="flex gap-4"> {/* Show when not authenticated */}
          <LinkButton buttonName="Register" url="/register" />
          <LinkButton buttonName="Login" url="/login" />
        </div>
      ) : (
        <div className="flex gap-4"> {/* Show when authenticated */}
          <LogOut/>
        </div>
      )}
    </div>
  );
}
export default NavBar
