import { useNavigate } from 'react-router-dom';

const useNavigateWithMiddleClick = (path) => {
  const navigate = useNavigate();

  const handleMouseClick = (e) => {
    if (e.button === 2) {
     
      return;
    }

    e.preventDefault();  

    if (e.button === 1) {
      // Middle-click (button 1)
      setTimeout(() => {
        const newTab = window.open(path, '_blank', 'noopener,noreferrer');
        if (newTab) {
          newTab.opener = null;
        }
      }, 100);
    } else {
      // Left-click (button 0)
      navigate(path);
    }
  };

  return handleMouseClick;
};

export default useNavigateWithMiddleClick;
