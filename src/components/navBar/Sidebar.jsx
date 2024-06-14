import React, { useEffect, useState } from 'react';
import { useGlobalState } from '../../StateContext';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPlay, faUser, faList, faVideo, faClock, faThumbsUp, faBell,faSignInAlt,faChevronRight   } from '@fortawesome/free-solid-svg-icons';
import { getSubscribedChannels } from '../../utils/subscriptionUtils';
import { findPlaylistIdByUserAndTitle } from '../../utils/playlist';
import { getColorFromInitial } from '../../utils/getColorFromInitial';
import Youtube from "../../assets/images/y3.png"
import SubMenu from './SubMenu';
import { useNavigate } from 'react-router-dom'
const Sidebar = () => {
  const { showSubMenu, user,isAuthenticated,token } = useGlobalState(); 
  const navigate = useNavigate()
  const [subscribedChannels, setSubscribedChannels] = useState([]);
  const [watchLaterPlaylistId,setWatchLaterPlaylistId] = useState(0)
  const [likedVideoPlaylistId,setLikedVideoPlaylistId] = useState(0)

  useEffect(() => {
    const fetchPlaylistIds = async () => {
      try {
        const watchLaterId = await findPlaylistIdByUserAndTitle("Watch Later");
        const likedVideoId = await findPlaylistIdByUserAndTitle("Liked Video");

        setWatchLaterPlaylistId(watchLaterId);
        setLikedVideoPlaylistId(likedVideoId);
        console.log(watchLaterId,likedVideoId)
      } catch (error) {
        console.error("Error fetching playlist IDs:", error);
      }
    };

    if (token && isAuthenticated) {
    fetchPlaylistIds();
  }
  }, []);

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

  const handleHomepageRedirect = () => {
    if (window.location.pathname !== "/") {
      navigate("/")
    }
  }


  const renderSubscribedChannels = () => {
      return subscribedChannels.map((channel) => {
        const initial = channel.username.charAt(0).toUpperCase(); 
        const circleColor = getColorFromInitial(initial)
        return (
          <li key={channel.id} className="mt-4 flex items-center hover:bg-gray-700 rounded-full p-2">
            <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1" style={{ backgroundColor: circleColor }}>
              <span className="text-white font-bold text-lg">{initial}</span>
            </div>
            <Link to={`/user/${channel.id}`} className="block hover:text-gray-400 ml-4">
              {channel.username}
            </Link>
          </li>
        );
      });
    };

    return (
  <div
    className={`fixed top-0 left-0 h-full bg-custom-black text-white shadow-lg transition-transform transform ${
      showSubMenu ? 'translate-x-0' : '-translate-x-full'
    } z-40`}
    style={{ width: '200px' }}
  >
    <div className="p-2">
      <div className="flex gap-4 items-center flex-shrink-0 ml-2">
        <SubMenu className="" />
        <img onClick={handleHomepageRedirect} src={Youtube} className="ml-8 h-12 w-24" alt="YouTube" />
      </div>
      <ul className="mt-6">
        <li className="mt-4 flex items-center hover:bg-gray-700 rounded-full p-2">
          <FontAwesomeIcon icon={faHome} className="ml-2 mr-4" />
          <Link to="/" className="block w-full hover:text-gray-400">Home</Link>
        </li>
        {isAuthenticated ? (
          <>
            <li className="mt-4 flex items-center hover:bg-gray-700 rounded-full p-2">
              <FontAwesomeIcon icon={faBell} className="ml-2 mr-4" />
              <Link to="/subscriptions" className="block w-full hover:text-gray-400">Subscriptions</Link>
            </li>
            <hr className="my-4 border-gray-700 w-full" />
            <li className="mt-4 flex items-center hover:bg-gray-700 rounded-full p-2">
              <FontAwesomeIcon icon={faChevronRight} className="ml-2 mr-4" />
              <span className="block w-full hover:text-gray-400">You</span>
            </li>
            <li className="mt-4 flex items-center hover:bg-gray-700 rounded-full p-2">
              <FontAwesomeIcon icon={faUser} className="ml-2 mr-4" />
              <Link to={`/user/${user}?tab=home`} className="block w-full hover:text-gray-400">Your Channel</Link>
            </li>
            <li className="mt-4 flex items-center hover:bg-gray-700 rounded-full p-2">
              <FontAwesomeIcon icon={faList} className="ml-2 mr-4" />
              <Link to={`/user/${user}?tab=Playlist`} className="block w-full hover:text-gray-400">Playlist</Link>
            </li>
            <li className="mt-4 flex items-center hover:bg-gray-700 rounded-full p-2">
              <FontAwesomeIcon icon={faVideo} className="ml-2 mr-4" />
              <Link to={`/user/${user}?tab=Video`} className="block w-full hover:text-gray-400">Your videos</Link>
            </li>
            <li className="mt-4 flex items-center hover:bg-gray-700 rounded-full p-2">
              <FontAwesomeIcon icon={faClock} className="ml-2 mr-4" />
              <Link to={`/playlist/${watchLaterPlaylistId}`} className="block w-full hover:text-gray-400">Watch later</Link>
            </li>
            <li className="mt-4 flex items-center hover:bg-gray-700 rounded-full p-2">
              <FontAwesomeIcon icon={faThumbsUp} className="ml-2 mr-4" />
              <Link to={`/playlist/${likedVideoPlaylistId}`} className="block w-full hover:text-gray-400">Liked videos</Link>
            </li>
            <hr className="my-4 border-gray-700 w-full" />
            <li className="mt-4">
              <span className="block font-bold">Subscriptions</span>
            </li>
            {renderSubscribedChannels()}
          </>
        ) : (
          <li className="mt-4 flex items-center hover:bg-gray-700 rounded-full p-2">
            <FontAwesomeIcon icon={faSignInAlt} className="ml-2 mr-4" />
            <Link to="/signin" className="block w-full hover:text-gray-400">Login</Link>
          </li>
        )}
      </ul>
    </div>
  </div>
);

};

export default Sidebar;