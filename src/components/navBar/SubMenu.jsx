import React from 'react';
import { useGlobalState } from '../../StateContext';

function SubMenu() {
  const { showSubMenu, setShowSubMenu } = useGlobalState();
  const handleToggleSubMenu = () => {
    setShowSubMenu(!showSubMenu);
  };

  return (
    <div>
      <div className="w-6 h-6" onClick={handleToggleSubMenu}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 cursor-pointer">
          <path fillRule="evenodd" d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
  );
}

export default SubMenu;
