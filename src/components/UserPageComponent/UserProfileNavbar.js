import React, { useEffect } from 'react';
import { useGlobalState } from '../../StateContext';

function UserProfileNavbar() {
    const { userUsername } = useGlobalState();

    useEffect(() => {
        console.log("What is the user", userUsername);
    }, []);

    if (!userUsername) return null;

    const firstLetter = userUsername.username ? userUsername.username.charAt(0).toUpperCase() : '';

    return (
        <div className="flex items-center p-4 border rounded shadow-md">
            <div className="flex items-center justify-center w-24 h-24 bg-blue-500 text-white text-4xl font-bold rounded-full">
                {userUsername[0].toUpperCase()}
            </div>
            <div className="ml-6">
                <div className="text-2xl font-semibold">{userUsername}</div>
                <div className="text-gray-600 mt-2">{userUsername} • {userUsername}</div>
                <button className="mt-4 px-4 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600">
                    Subscribe
                </button>
            </div>
        </div>
    );
}

export default UserProfileNavbar;
