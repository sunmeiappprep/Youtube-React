import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import React from 'react';
import { registerUser,loginUser,testing,logOut} from './utils/authUtils';
import NavBar from './components/navBar/NavBar';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/CRUD';
import HomePage from './components/pages/HomePage';
import VideoUploadPage from './components/pages/VideoPage';
import SignInAndRegisterPage from './components/pages/SignInAndRegisterPage';
import RegisterUserPage from './components/pages/RegisterUserPage';
import Register from './components/pages/CRUD';
import VideoPage from './components/pages/VideoPage';
import FakeComments from './components/pages/Faker';
import Search from './components/pages/Search';
import UserPage from './components/pages/UserPage';
import PlaylistPage from './components/pages/PlaylistPage';
function App() {


  return (
    <div className="App bg-custom-dark text-custom-white">
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterUserPage />} />
        <Route path="/crud" element={<Register />} />
        <Route path="/video/:id" element={<VideoPage />} />
        <Route path="/video" element={<VideoUploadPage />} />
        <Route path="/search/:searchTerm" element={<Search />} />
        <Route path="/signin" element={<SignInAndRegisterPage />} />
        <Route path="/faker" element={<FakeComments />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/playlist/:id" element={<PlaylistPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
