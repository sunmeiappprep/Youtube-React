import React, { useState } from 'react';
import { postVideo } from '../../utils/videoUtils';
import { useGlobalState } from '../../StateContext'; 

function VideoUploadPage() {
  const { user,token,setUser, setToken } = useGlobalState(); // Access the context methods
  const [title, setVideoTitle] = useState('');
  const [url, setVideoURL] = useState('');
  const [description, setVideoDescription] = useState('');
  
  console.log(user, token);
  const videoInfo = {
    user_id:user,
    title: 'My Video Title',
    url: 'http://example.com/myvideo.mp4',
    description: 'An optional video description.'
  };
  
  

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
        title,
        url,
        description: description || 'No description provided',
    });
    alert('Video info submitted! Check console for details.');
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <div className="mb-5">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Video Title:
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setVideoTitle(e.target.value)}
            required
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-5">
          <label htmlFor="url" className="block text-sm font-medium text-gray-700">
            Video URL:
          </label>
          <input
            id="url"
            type="url"
            value={url}
            onChange={(e) => setVideoURL(e.target.value)}
            required
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Video Description (Optional):
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setVideoDescription(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
            rows="4"
          />
        </div>
        <button onClick={postVideo} type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
          Submit
        </button>
      </form>
      <button  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"  onClick={() => { postVideo(videoInfo); }}></button>
    </div>
  );
}

export default VideoUploadPage;
