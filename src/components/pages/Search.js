import React, { useEffect, useState } from 'react'
import { getSearchVideo } from '../../utils/videoUtils'
import { useParams } from 'react-router-dom';
function Search() {
    let  { searchTerm } = useParams();
    searchTerm = decodeURIComponent(searchTerm);
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        getSearchVideo(searchTerm).then(setVideos);
    }, [searchTerm]);


    return (
        <div>
          {videos.map(video => {
            const videoId = video.url.split("v=")[1].split("&")[0];
            return (
              <div key={video.id}>
                <img src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`} alt="Video"></img>
                <p>{video.title}</p>
              </div>
            );
          })}
        </div>
      );
      
}

export default Search