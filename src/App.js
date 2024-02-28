import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import React from 'react';
import { registerUser,loginUser,testing,logOut} from './utils/authUtils';
import NavBar from './components/navBar/NavBar';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';
import HomePage from './components/pages/HomePage';
import VideoUploadPage from './components/pages/VideoPage';
import SignInAndRegisterPage from './components/pages/SignInAndRegisterPage';
import RegisterUserPage from './components/pages/RegisterUserPage';
import Register from './components/pages/RegisterPage';
import VideoPage from './components/pages/VideoPage';
function App() {


  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path="/login" element={<SignInAndRegisterPage />} />
        <Route path="/register" element={<RegisterUserPage />} />
        <Route path="/crud" element={<Register />} />
        <Route path="/video/:id" element={<VideoPage />} />
        <Route path="/video" element={<VideoUploadPage />} />
        <Route path="/signin" element={<SignInAndRegisterPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
