import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './output.css';
import React from 'react';
import { registerUser,loginUser,testing,logOut} from './utils/authUtils';
import NavBar from './components/navBar/NavBar';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';
import HomePage from './components/pages/HomePage';
import VideoUploadPage from './components/pages/VideoPage';
function App() {


  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/video" element={<VideoUploadPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
