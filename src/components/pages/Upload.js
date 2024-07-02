import React, { useState } from 'react';
import { postVideo } from '../../utils/videoUtils';
import NavBar from '../navBar/NavBar';
import { useGlobalState } from '../../StateContext';
import Sidebar from '../navBar/Sidebar';
import { useNavigate } from 'react-router-dom';
const VideoUpload = () => {
    const navigate = useNavigate()
    const {showSubMenu} = useGlobalState()
    const [videoInfo, setVideoInfo] = useState({
        title: '',
        url: '',
        description: ''
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVideoInfo({
            ...videoInfo,
            [name]: value
        });
    };

    const validateUrl = (url) => {
        const regex = /watch\?v=.{11}/;
        return regex.test(url);
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        const { title, url } = videoInfo;
    
        if (!title) {
          setErrorMessage('Please enter a valid title.');
          return;
        }
    
        if (!url) {
          setErrorMessage('Please enter a valid URL.');
          return;
        }
    
        if (!validateUrl(url)) {
          setErrorMessage('Video URL must look like https://www.youtube.com/watch?v=dQw4w9WgXcQ');
          return;
        }
    
        try {
          let response = await postVideo(videoInfo);
          setErrorMessage('');
          setVideoInfo({
            title: '',
            url: '',
            description: ''
          });
          navigate(`/video/${response.id}`);
        } catch (error) {
          console.error('Failed to submit video:', error);
          setErrorMessage('Failed to submit video. Please try again.');
        }
      };

    return (
        <div className="min-h-screen bg-custom-dark flex">
          <div className={`${showSubMenu ? 'w-full md:w-64' : 'w-0'} transition-all duration-300`}>
            <Sidebar />
          </div>
          <div className="flex-grow flex flex-col">
            <NavBar />
            <div className="flex flex-grow items-center justify-center p-4">
              <div className="bg-custom-gray p-8 rounded-lg shadow-md w-full max-w-md">
                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-4">
                    <label className="block text-white mb-2" htmlFor="title">Title</label>
                    <input
                      className="w-full p-2 rounded bg-black text-white"
                      type="text"
                      id="title"
                      name="title"
                      value={videoInfo.title}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-white mb-2" htmlFor="url">Any Youtube Video URL</label>
                    <input
                      className="w-full p-2 rounded bg-black text-white"
                      type="url"
                      id="url"
                      name="url"
                      value={videoInfo.url}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-white mb-2" htmlFor="description">Description</label>
                    <textarea
                      className="w-full p-2 rounded bg-black text-white"
                      id="description"
                      name="description"
                      value={videoInfo.description}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
                  <button
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    type="submit"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    };
    
    export default VideoUpload;