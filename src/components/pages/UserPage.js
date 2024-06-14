import React from 'react';
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
                    <div className="flex flex-col items-center p-6">
                        <div className="max-w-10.5xl w-full">
                            <UserProfileNavbar />
                        </div>
                        <div className="max-w-10.5xl w-full mt-6">
                            <UserHomeVideoPlaylist />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserPage;
