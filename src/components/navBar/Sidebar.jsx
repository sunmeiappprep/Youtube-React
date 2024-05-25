import React from 'react';
import { useGlobalState } from '../../StateContext';

const Sidebar = () => {
  const { showSubMenu } = useGlobalState();

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-gray-800 text-white shadow-lg transition-transform transform ${
        showSubMenu ? 'translate-x-0' : '-translate-x-full'
      }`}
      style={{ width: '250px' }}
    >
      <div className="p-4">
        <h2 className="text-xl font-bold">Sidebar</h2>
        <ul>
          <li className="mt-4">Menu Item 1</li>
          <li className="mt-4">Menu Item 2</li>
          <li className="mt-4">Menu Item 3</li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
