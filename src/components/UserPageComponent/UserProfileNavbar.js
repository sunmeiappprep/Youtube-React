import React, { useState, useEffect } from 'react';
import { getUsernameById } from '../../utils/authUtils';
import { useParams } from 'react-router-dom';
import { checkIfSubscribed, subscribeToChannel, unsubscribeFromChannel } from '../../utils/subscriptionUtils';
import { useGlobalState } from '../../StateContext';
function UserProfileNavbar() {
  const { id } = useParams();
  const {token,isAuthenticated} = useGlobalState()
  const [userUsername, setUserUsername] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchUsername = async () => {
        const username = await getUsernameById(id);
        setUserUsername(username);
      };
      fetchUsername();
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      const fetchSubscriptionStatus = async () => {
        const subscribed = await checkIfSubscribed(id);
        setIsSubscribed(subscribed);
      };
      if(token && isAuthenticated){
        fetchSubscriptionStatus();
      }
    }
  }, [id]);

  if (!userUsername) return null;

  const firstLetter = userUsername.charAt(0).toUpperCase();

  const handleSubscribe = async () => {
    try {
      await subscribeToChannel(id);
      setIsSubscribed(true);
    } catch (error) {
      console.error('Failed to subscribe:', error);
    }
  };

  const handleUnsubscribe = async () => {
    try {
      await unsubscribeFromChannel(id);
      setIsSubscribed(false);
    } catch (error) {
      console.error('Failed to unsubscribe:', error);
    }
  };

  return (
    <div className="flex items-center p-4 border rounded shadow-md">
      <div className="flex items-center justify-center w-24 h-24 bg-blue-500 text-white text-4xl font-bold rounded-full">
        {firstLetter}
      </div>
      <div className="ml-6">
        <div className="text-2xl font-semibold">{userUsername}</div>
        <div className="text-gray-600 mt-2">{userUsername} • {userUsername}</div>
        {isSubscribed ? (
          <div
            className={`mt-4 px-6 py-2 font-semibold rounded-full cursor-pointer transition-colors duration-300 ${hovering ? 'bg-red-300 text-white' : 'bg-gray-500 text-white'}`}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            onClick={handleUnsubscribe}
          >
            {hovering ? 'Unsubscribe' : 'Subscribed'}
          </div>
        ) : (
          <button
            onClick={handleSubscribe}
            className="mt-4 px-6 py-2 bg-white text-black font-semibold rounded-full border hover:bg-gray-100"
          >
            Subscribe
          </button>
        )}
      </div>
    </div>
  );
}

export default UserProfileNavbar;
