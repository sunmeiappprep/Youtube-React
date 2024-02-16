import React from 'react';
import { useNavigate } from 'react-router-dom';

function LinkButton({ buttonName, url }) { // Destructuring props here
  let navigate = useNavigate();
  
  return (
    <button onClick={() => navigate(url)} className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      {buttonName}
    </button>
  );
}

export default LinkButton;
