import React, { useEffect, useState } from 'react';
import { useGlobalState } from '../../StateContext';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPlay, faUser, faList, faVideo, faClock, faThumbsUp, faBell } from '@fortawesome/free-solid-svg-icons';
import { getSubscribedChannels } from '../../utils/subscriptionUtils';
const Sidebar = () => {
  const { showSubMenu, user,isAuthenticated } = useGlobalState(); 
  const [subscribedChannels, setSubscribedChannels] = useState([]);

  useEffect(() => {
  if (user && isAuthenticated) {
    const fetchSubscribedChannels = async () => {
      const channels = await getSubscribedChannels(user);
      setSubscribedChannels(channels);
    };

    const timer = setTimeout(() => {
      fetchSubscribedChannels();
    }, 1500);


    return () => clearTimeout(timer);
  }
}, [user, isAuthenticated]);
  return (
    <div
      className={`fixed top-0 left-0 h-full bg-black text-white shadow-lg transition-transform transform ${
        showSubMenu ? 'translate-x-0' : '-translate-x-full'
      }`}
      style={{ width: '250px' }}
    >
      <div className="p-4">
        <h2 className="text-xl font-bold">Sidebar</h2>
        <ul className="mt-6">
          <li className="mt-4 flex items-center">
            <FontAwesomeIcon icon={faHome} className="mr-3" />
            <Link to="/" className="block hover:text-gray-400">Home</Link>
          </li>
          <li className="mt-4 flex items-center">
            <FontAwesomeIcon icon={faBell} className="mr-3" />
            <Link to="/subscriptions" className="block hover:text-gray-400">Subscriptions</Link>
          </li>
          <li className="mt-4 flex items-center">
            <FontAwesomeIcon icon={faUser} className="mr-3" />
            <Link to={`/user/${user}?tab=home`} className="block hover:text-gray-400">You</Link>
          </li>
          <li className="mt-4 flex items-center">
            <FontAwesomeIcon icon={faList} className="mr-3" />
            <Link to={`/user/${user}?tab=Playlist`} className="block hover:text-gray-400">Playlist</Link>
          </li>
          <li className="mt-4 flex items-center">
            <FontAwesomeIcon icon={faVideo} className="mr-3" />
            <Link to={`/user/${user}?tab=Video`} className="block hover:text-gray-400">Your videos</Link>
          </li>
          <li className="mt-4 flex items-center">
            <FontAwesomeIcon icon={faClock} className="mr-3" />
            <Link to="/watch-later" className="block hover:text-gray-400">Watch later</Link>
          </li>
          <li className="mt-4 flex items-center">
            <FontAwesomeIcon icon={faThumbsUp} className="mr-3" />
            <Link to="/liked-videos" className="block hover:text-gray-400">Liked videos</Link>
          </li>
          <li className="mt-4">
            <span className="block font-bold">Subscriptions</span>
          </li>
          {subscribedChannels.map((channel) => (
            <li key={channel.id} className="mt-4 flex items-center pl-6">
              <Link to={`/user/${channel.id}`} className="block hover:text-gray-400">
                {channel.username}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;