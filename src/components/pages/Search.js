import React, { useEffect, useState } from 'react';
import { getSearchVideo } from '../../utils/videoUtils';
import { useParams } from 'react-router-dom';
import DisplaySearchVideoThumbnail from '../searchPageComp/DisplaySearchVideoThumbnail'; 
import NavBar from '../navBar/NavBar';
import Sidebar from '../navBar/Sidebar';
import { useGlobalState } from '../../StateContext';
function Search() {
    let { searchTerm } = useParams();
    searchTerm = decodeURIComponent(searchTerm);
    const [videos, setVideos] = useState([]);
    const { showSubMenu,setShowSubMenu } = useGlobalState(); 


    useEffect(() => {
        getSearchVideo(searchTerm).then(setVideos);
    }, [searchTerm]);
    console.log(videos);

    return (
      <div className="relative flex min-h-screen">
          <div className={`${showSubMenu ? 'w-64' : 'w-0'} transition-all duration-300`}>
              <Sidebar />
          </div>
          <div className={`flex-grow flex flex-col transition-all duration-300`}>
              <NavBar />
              <div className="flex-grow flex flex-col items-center space-y-4 p-4">
                  {videos && videos.length > 0 ? (
                      videos.map((video) => {
                          const videoId = video.url.split("v=")[1].split("&")[0];
                          return (
                              <DisplaySearchVideoThumbnail
                                  key={video.id}
                                  id={video.id}
                                  userId={video.userId}
                                    username={video.username}
                                  title={video.title}
                                  description={video.description}
                                  view={video.view}
                                  url={video.url}
                                  generatedDate={video.generatedDate}
                                  thumbnail={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
                              />
                          );
                      })
                  ) : (
                      <div className="flex-grow flex items-center justify-center">
                          <p className="text-gray-500 text-xl">There are no search results.</p>
                      </div>
                  )}
              </div>
          </div>
      </div>
    );
}

export default Search;
