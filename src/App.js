import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import React from 'react';
import HomePage from './components/pages/HomePage';
import SignInPage from './components/pages/SignInPage';
import RegisterUserPage from './components/pages/RegisterUserPage';
import Register from './components/pages/CRUD';
import Search from './components/pages/Search';
import UserPage from './components/pages/UserPage';
import PlaylistPage from './components/pages/PlaylistPage';
import Subscriptions from './components/pages/Subscriptions';
import VideoUploadPage from './components/pages/Upload';
import VideoPage from './components/pages/VideoPage';
import PlaylistQuery from './components/videoPageComponent/PlaylistQuery';
import PlaylistVideoPage from './components/pages/PlaylistVideoPage';


function App() {


  return (
    <div className="App bg-custom-dark text-custom-white min-h-screen w-full overflow-x-hidden">
    <Router>
      <Routes>
        <Route path="/register" element={<RegisterUserPage />} />
        <Route path="/upload" element={<VideoUploadPage />} />
        <Route path="/crud" element={<Register />} />
        <Route path="/video/:id" element={<VideoPage />} />
        <Route path="/search/:searchTerm" element={<Search />} />
        <Route path="/login" element={<SignInPage />} />
        <Route path="/user/:id" element={<UserPage />} />
        <Route path="/subscriptions" element={<Subscriptions />} />
        <Route path="/playlist/:id" element={<PlaylistPage />} />
        <Route path="/playlist/:playlistId/video/:videoId" element={<PlaylistVideoPage />} />
        <Route path="/pq" element={<PlaylistQuery />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
