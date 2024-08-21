import { useEffect } from 'react';

const useYouTubeIframeAPI = () => {
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        window.YT.ready(() => {
          // console.log('YouTube IFrame API ready');
        });
      };
    }
  }, []);
};

export default useYouTubeIframeAPI;
