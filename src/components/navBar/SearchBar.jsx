import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if(searchTerm.length !== 0){
      navigate(`/search/${encodeURIComponent(searchTerm)}`); 
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-xs md:max-w-md lg:max-w-screen-md mx-auto">
      <input
        type="search"
        placeholder="Search"
        className="pl-5 text-white placeholder-gray-500 bg-custom-dark rounded-l-full h-10 w-full border-1 border-custom-gray border-r-0 focus:border-blue-500 focus:outline-none"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        type="submit"
        className="bg-custom-gray text-white rounded-r-full border-2 border-custom-gray h-10 px-4 hover:bg-gray-600"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-white">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
      </button>
    </form>
  );
}

export default SearchBar;