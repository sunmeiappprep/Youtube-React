import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { checkIfSubscribed, subscribeToChannel, unsubscribeFromChannel } from '../../utils/subscriptionUtils';
import { useGlobalState } from '../../StateContext';
import { convertNumber } from '../../utils/numberUtils';
function UserProfileNavbar({viewTotal,subTotal,userUsername}) {
  const { id } = useParams();
  const {token,isAuthenticated} = useGlobalState()
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [hovering, setHovering] = useState(false);



  useEffect(() => {
    // console.log("id",id)
    if (id) {
      const fetchSubscriptionStatus = async () => {
        const subscribed = await checkIfSubscribed(id);
        setIsSubscribed(subscribed);
      };
      if(token){
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
        <div className="text-gray-600 mt-2">{convertNumber(viewTotal)} views • {convertNumber(subTotal)} Subscribers</div>
        <div className="mt-4">
          {isSubscribed ? (
            <div
              className={`flex items-center justify-center px-6 py-2 font-semibold rounded-full cursor-pointer transition-colors duration-300 ${hovering ? 'bg-red-300 text-white w-36' : 'bg-gray-500 text-white w-36'}`}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
              onClick={handleUnsubscribe}
            >
              {hovering ? 'Unsubscribe' : 'Subscribed'}
            </div>
          ) : (
            <button
              onClick={handleSubscribe}
              className="flex items-center justify-center px-6 py-2 bg-white text-black font-semibold rounded-full border hover:bg-gray-100"
            >
              Subscribe
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfileNavbar;
