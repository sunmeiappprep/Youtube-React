import React, { useEffect, useState, useCallback } from 'react';
import NavBar from '../navBar/NavBar';
import VideoGrid from '../grid/VideoGrid';
import { fetchVideos } from '../../utils/videoUtils';

export default function HomePage() {
  const [seed, setSeed] = useState(null);
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  //Set a seed and make sure it dont change when scrolling
  useEffect(() => {
    if (seed === null) {
      const currentTimeInSeconds = Math.floor(Date.now() / 1000);
      setSeed(currentTimeInSeconds);
    }
  }, []);


//useCallback makes it more efficent, not sure how big in this case
  const fetchAndSetVideos = useCallback(() => {
    fetchVideos(seed, page).then(newVideos => {
      setVideos(prevVideos => [...prevVideos, ...newVideos]);
    });
  }, [seed, page]);

  //mirror the dependancy on the callback
  useEffect(() => {
    if (seed !== null) {
      //passing a function to useeffect
      fetchAndSetVideos();
    }
  }, [seed, page, fetchAndSetVideos]);


  //scroll
  useEffect(() => {
    const handleScroll = () => {
      const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100; 
      if (nearBottom) {
        setPage(prevPage => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []); 

  if (videos.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <NavBar />
      <VideoGrid videos={videos} />
    </div>
  );
}
