import React, { useEffect, useRef, useState, forwardRef } from 'react';

const VideoEmbed = forwardRef(({ videoId }, ref) => {
  const iframeOverlayRef = useRef();
  const playerRef = useRef(null);
  const containerRef = useRef();
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  const createPlayer = () => {
    if (window.YT && window.YT.Player) {
      playerRef.current = new window.YT.Player(`youtube-player-${videoId}`, {
        events: {
          onReady: (event) => {
            console.log('Player is ready');
            setIsPlayerReady(true);
          },
        },
      });
    } else {
      console.log('YouTube Player Error');
    }
  };

  useEffect(() => {
    // Load the IFrame Player API code asynchronously
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // This function creates an <iframe> (and YouTube player) after the API code downloads.
    window.onYouTubeIframeAPIReady = createPlayer;

    const handleIframeClick = (e) => {
      e.preventDefault();
      console.log('Overlay clicked. Toggling video play/pause.');

      if (isPlayerReady && playerRef.current) {
        const playerState = playerRef.current.getPlayerState();
        if (playerState === window.YT.PlayerState.PLAYING) {
          playerRef.current.pauseVideo();
        } else if (playerState === window.YT.PlayerState.PAUSED || playerState === window.YT.PlayerState.CUED) {
          playerRef.current.playVideo();
        }
      } else {
        console.log('Creating Player');
        createPlayer(); 
      }
    };

    const handleDoubleClick = (e) => {
      e.preventDefault();
      console.log('Overlay double-clicked. Toggling fullscreen.');
      if (document.fullscreenElement) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      } else {
        if (containerRef.current.requestFullscreen) {
          containerRef.current.requestFullscreen();
        } else if (containerRef.current.mozRequestFullScreen) { // Firefox
          containerRef.current.mozRequestFullScreen();
        } else if (containerRef.current.webkitRequestFullscreen) { // Chrome, Safari and Opera
          containerRef.current.webkitRequestFullscreen();
        } else if (containerRef.current.msRequestFullscreen) { // IE/Edge
          containerRef.current.msRequestFullscreen();
        }
      }
    };

    const overlay = iframeOverlayRef.current;
    if (overlay) {
      console.log('Overlay is present. Adding click event listener.');
      overlay.addEventListener('click', handleIframeClick);
      overlay.addEventListener('dblclick', handleDoubleClick);
    } else {
      console.log('Overlay not found.');
    }

    return () => {
      if (overlay) {
        console.log('Removing event listeners from overlay.');
        overlay.removeEventListener('click', handleIframeClick);
        overlay.removeEventListener('dblclick', handleDoubleClick);
      }
    };
  }, [videoId, isPlayerReady]);

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden rounded-3xl" style={{ paddingBottom: '56.25%' }}>
      <iframe
        id={`youtube-player-${videoId}`}
        className="absolute top-0 left-0 w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1&loop=1&playlist=${videoId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
      <div
        ref={iframeOverlayRef}
        className="absolute top-0 left-0 w-full h-[calc(100%-50px)]"
        style={{ background: 'transparent', cursor: 'pointer', userSelect: 'none' }}
      />
    </div>
  );
});

export default VideoEmbed;
