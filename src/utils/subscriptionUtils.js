import api from "./axiosInterceptors";

export const subscribeToChannel = async (channelId) => {
    try {
      const response = await api.post('http://localhost:8080/api/subscriptions/subscribe', null, {
        params: {
          channelId: channelId,
        },
      });
      console.log("Axios", response.data);
      return response.data; 
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    }
  };

  export const checkIfSubscribed = async (channelId) => {
    try {
      const response = await api.get('http://localhost:8080/api/subscriptions/check', {
        params: {
          channelId: channelId,
        },
      });
      console.log("Axios", response.data);
      return response.data; 
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    }
  };

export const unsubscribeFromChannel = async (channelId) => {
  try {
    const response = await api.delete('http://localhost:8080/api/subscriptions/unsubscribe', {
      params: {
        channelId: channelId,
      },
    });
    console.log("Axios", response.data); 
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
  }
};


export const getSubscriptions = async (subscriberId) => {
    try {
      const response = await api.get(`http://localhost:8080/api/subscriptions/subscriber/${subscriberId}`);
      console.log("Axios", response.data);
      return response.data; 
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    }
  };


export const getSubscribers = async (channelId) => {
  try {
    const response = await api.get(`http://localhost:8080/api/subscriptions/channel/${channelId}`);
    console.log("Axios", response.data);
    return response.data; 
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
  }
};


export const getSubscribedChannels = async (subscriberId) => {
  try {
    const response = await api.get(`http://localhost:8080/api/subscriptions/${subscriberId}/channels`);
    console.log("Axios", response.data);
    return response.data;
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
  }
};