import React, { useEffect, useRef } from 'react';

const YouTubeHoverAutoplay = ({ videoId }) => {
  const playerRef = useRef(null);

  useEffect(() => {
    // Load the IFrame Player API code asynchronously
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // This function creates an <iframe> (and YouTube player) after the API code downloads
    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player('player', {
        height: '315',
        width: '560',
        videoId: videoId,
        playerVars: {
          'autoplay': 0,
          'controls': 1,
          'mute': 1
        },
        events: {
          'onReady': onPlayerReady
        }
      });
    };

    // Function to handle when the player is ready
    const onPlayerReady = (event) => {
      const videoContainer = document.getElementById('player-container');

      videoContainer.addEventListener('mouseover', () => {
        playerRef.current.playVideo();
      });

      videoContainer.addEventListener('mouseout', () => {
        playerRef.current.pauseVideo();
      });
    };
  }, [videoId]);

  return (
    <div className="video-container" id="player-container">
      <div id="player" className="video-placeholder"></div>
    </div>
  );
};

export default YouTubeHoverAutoplay;
