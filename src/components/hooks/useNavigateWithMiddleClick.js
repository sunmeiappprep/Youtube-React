import { useNavigate } from 'react-router-dom';

const useNavigateWithMiddleClick = (path) => {
  const navigate = useNavigate();

  const handleMouseClick = (e) => {
    e.preventDefault();  // Prevent the default action
    if (e.button === 1) {
      setTimeout(() => {
        const newTab = window.open(path, '_blank', 'noopener,noreferrer');
        if (newTab) {
          newTab.opener = null;
        }
      }, 100);
    } else {
      navigate(path);
    }
  };

  return handleMouseClick;
};

export default useNavigateWithMiddleClick;
