import React from 'react'
import Register from './Register'
import SignIn from './SignIn'
import SearchBar from './SearchBar'
import SubMenu from './SubMenu'

function NavBar() {
  return (
    <div className="flex justify-between items-center w-full px-4 py-2">
      <div className="flex gap-4">
      <SubMenu/>
      <SubMenu/>
      </div>
      <SearchBar className="flex-grow" /> {/* SearchBar will take the available space but won't be exactly centered due to other elements taking space too */}
      <div className="flex gap-4"> {/* This container will hold your Register and SignIn components */}
        <Register />
        <SignIn />
      </div>
    </div>
  );
}
export default NavBar
