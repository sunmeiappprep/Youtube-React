import React, { useState } from 'react';
import { postVideo } from '../../utils/videoUtils';
const VideoUpload = () => {
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
        if (validateUrl(videoInfo.url)) {
            try {
                await postVideo(videoInfo);
                setErrorMessage('');
                // Optionally, reset the form after successful submission
                setVideoInfo({
                    title: '',
                    url: '',
                    description: ''
                });
            } catch (error) {
                console.error('Failed to submit video:', error);
            }
        } else {
            setErrorMessage('Invalid URL format. The URL must contain "watch?v=" followed by 11 characters.');
        }
    };

    return (
        <div className="bg-custom-gray p-4 rounded-lg shadow-md">
            <form onSubmit={handleSubmit}>
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
                    <label className="block text-white mb-2" htmlFor="url">URL</label>
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
    );
};

export default VideoUpload;
