import React, { useEffect, useState, useCallback } from 'react';
import NavBar from '../navBar/NavBar';
import VideoGrid from '../grid/VideoGrid';
import Sidebar from '../navBar/Sidebar'; // Import the Sidebar component
import { useGlobalState } from '../../StateContext'; // Import the global state
import { fetchVideos } from '../../utils/videoUtils';

export default function HomePage() {
  const [seed, setSeed] = useState(null);
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const { showSubMenu } = useGlobalState(); // Get the state for the sidebar visibility

  // Set a seed and make sure it doesn't change when scrolling
  useEffect(() => {
    if (seed === null) {
      const currentTimeInSeconds = Math.floor(Date.now() / 1000);
      setSeed(currentTimeInSeconds);
    }
  }, [seed]);

  // useCallback makes it more efficient, not sure how big in this case
  const fetchAndSetVideos = useCallback(() => {
    fetchVideos(seed, page).then(newVideos => {
      setVideos(prevVideos => [...prevVideos, ...newVideos]);
    });
    console.log(videos)
  }, [seed, page]);

  // Mirror the dependency on the callback
  useEffect(() => {
    if (seed !== null) {
      // Passing a function to useEffect
      fetchAndSetVideos();
    }
  }, [seed, page, fetchAndSetVideos]);

  // Scroll
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
    <div className="relative flex">
      <Sidebar />
      <div className={`flex-grow ${showSubMenu ? 'ml-64' : 'ml-0'}`}>
        <NavBar />
        <div className="p-4">
          <VideoGrid videos={videos} />
        </div>
      </div>
    </div>
  );
}
