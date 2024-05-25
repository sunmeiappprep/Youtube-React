import React, { useEffect, useState } from 'react';
import PlaylistTitleAndVideoInfo from '../playlistComp/PlaylistTitleAndVideoInfo';
import NavBar from '../navBar/NavBar';
import UserProfileNavbar from '../UserPageComponent/UserProfileNavbar';
import UserHomeVideoPlaylist from '../UserPageComponent/UserHomeVideoPlaylist';
import { useGlobalState } from '../../StateContext'; 
import Sidebar from '../navBar/Sidebar';
function UserPage() {
    const { showSubMenu } = useGlobalState(); 
    return (
        <div className='bg-custom-dark min-h-screen'>
          <div className="relative flex">
            <Sidebar />
            <div className={`flex-grow ${showSubMenu ? 'ml-64' : 'ml-0'}`}>
              <NavBar />
              <UserProfileNavbar />
              <div className="p-4">
                <UserHomeVideoPlaylist />
              </div>
            </div>
          </div>
        </div>
      );
}

export default UserPage;
