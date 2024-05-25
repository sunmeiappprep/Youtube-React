// LoginPage.jsx
import React, { useState,useEffect } from 'react';
import { postVideo,getUserVideos,updateVideo,deleteVideo,getVideo, fetchVideos, getSearchVideo } from '../../utils/videoUtils';
import { addLiked, getLiked } from '../../utils/videoReactionUtils';
import { useGlobalState } from '../../StateContext'; 
import { createComment,getComments,deleteComment, updateComment, getCommentsReaction, commentAddLiked } from '../../utils/commentUtils';
import { loginUser,logOut, registerUser } from '../../utils/authUtils';
import { addToPlaylist, createPlaylist, deleteVideoFromPlaylist, getPlaylistVideo, getUserFirstVideo } from '../../utils/playlist';
import NavBar from '../navBar/NavBar';
function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { user,token,setUser, setToken,userObj,setUserObj } = useGlobalState(); // Access the context methods
  const [title, setVideoTitle] = useState('');
  const [url, setVideoURL] = useState('');
  const [description, setVideoDescription] = useState('');
  
  console.log(user, token);




    const handleMakeSubmitted = () =>{
      for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        const videoInfo = {
          title: element.title,
          url: `https://www.youtube.com/watch?v=${element.url}`,
          description: element.title
        };
        postVideo(videoInfo)
      }
    }

  const likedInfo = {
    userId:user,
    videoId: 3,
    liked: false,
  };

  const commentInfo = {
    text: 'tests',
  };

  const handleMassComment = () => {
    const comments = [
      "Great video! Keep up the good work!",
      "This was so helpful, thank you!",
      "Awesome content, as always!",
      "Loved every second of this video!",
      "Your videos never disappoint!",
      "So informative and well-made!",
      "Thanks for sharing this with us!",
      "You always make my day with your videos!",
      "Can't wait for your next upload!",
      "You're amazing at what you do!",
      "This is exactly what I needed, thanks!",
      "Fantastic job, keep it coming!",
      "I learned so much from this video!",
      "You’re incredibly talented!",
      "This is pure gold, thank you!",
      "Your editing is on point!",
      "You always have the best tips and advice!",
      "Such a high-quality production!",
      "This is why I’m subscribed to your channel!",
      "You’re an inspiration, keep it up!",
      "Loved the creativity in this one!",
      "This video is a game-changer!",
      "I always look forward to your content!",
      "You make everything look so easy!",
      "Your passion really shows in your work!"
    ];

    const pingPongComments = [
      "That backhand shot was incredible!",
      "I love how fast the players move, such agility!",
      "Can anyone suggest a good paddle for beginners?",
      "Wow, the spin on that serve was insane!",
      "I've never seen such precise footwork in a match.",
      "Does anyone know what brand of table they're using?",
      "I need to practice that topspin technique!",
      "The rallies in this match are so intense!",
      "How do you counter such a fast serve?",
      "This player has amazing reflexes!",
      "I wish I could play at half their skill level.",
      "Great match, both players were on fire!",
      "I learned so much from watching this video.",
      "The slow-motion replays are really helpful.",
      "Does anyone have tips for improving my serve?",
      "The commentator's insights are spot on.",
      "I didn't know you could curve the ball like that!",
      "This makes me want to hit the tables right now!",
      "The crowd's energy is really adding to the excitement.",
      "Such a great tutorial for beginners and pros alike!"
  ];
  
  
    pingPongComments.forEach(comment => {
      const commentObj = { text: comment };
      createComment(commentObj);
    });
  };
  

  const commentLikedInfo = {
    userId:user,
    commentId: 39,
    liked: true,
  };
  
  const commentLikedInfo2 = {
    userId:user,
    commentId: 39,
    liked: false,
  };




  useEffect(() => {
    console.log("Updated global state user:", user);
    console.log("Updated global state token:", token);
  }, [user, token]);

  const  handleSubmitLogin  = async (event) => {
    event.preventDefault();
    // Handle the login logic here
    let data = await loginUser("asdasd2@gmail.com", 'asdasd')
    console.log(data)
    setUser(data.user.id)
    setUserObj(data.user.username)
    setToken(data.jwtToken)
  };

  

  
  
  
  const handleUpdateVideo = () => {
    updateVideo(2,videoInfo)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
        title,
        url,
        description: description || 'No description provided',
    });
    alert('Video info submitted! Check console for details.');
  };

  const seedInfo = {
    seed:213213,
    page:1,
    size:10
  }
  
  const handleCreatePlaylist = () => {
    let playlistInfo = {
      title:"dwdw"
    }
    createPlaylist(playlistInfo)
  }

  const handleAddToPlaylist = () => {
    let playlistInfo = {
      playlistTitleId:69,
      videoId:186
    }
    addToPlaylist(playlistInfo)
  }
  const handleGeneratingUser =() =>{
    const firstNames = ["James", "John", "Robert", "Michael", "William", "David", "Richard", "Joseph", "Thomas", "Charles", "Christopher", "Daniel", "Matthew", "Anthony", "Mark", "Donald", "Steven", "Paul", "Andrew", "Joshua"];
    const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin"];
    const userData = [];
    const numUsers = 100; // Adjust this number as needed
    
    for (let i = 0; i < numUsers; i++) {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const username = `${firstName}.${lastName}${i}`.toLowerCase();
      const password = `pass${i + 1000}`; // Simple passwords for example
      userData.push({ username, password });
    }
    
    // Loop over the user data and register each user
    userData.forEach(user => {
      registerUser(user.username, user.password);
    });
  }
// Generate user data with realistic usernames



  return (
    <div className="flex-wrap justify-center items-center h-screen ">
    <NavBar/>
      <button  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"  onClick={() => { postVideo(videoInfo); }}>Post Video</button>
      <button  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"  onClick={() => { getUserVideos(user); }}>Get User Video</button>
      <button  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-yellow-700"  onClick={() => handleUpdateVideo()}>Update Video</button>
      <button  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-yellow-700"  onClick={() => deleteVideo(187)}>Delete Video</button>
      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-yellow-700"  onClick={() => getVideo(3)}>Get Video info</button>
      <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-yellow-700"  onClick={() => addLiked(likedInfo)}>addLiked</button>
      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-yellow-700"  onClick={() => getLiked(3)}>getLiked</button>
      <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-yellow-700"  onClick={() => handleMassComment()}>Masscomment</button>
      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-yellow-700"  onClick={handleSubmitLogin}>Login</button>
      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-yellow-700"  onClick={() => logOut()}>Logout</button>
      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-yellow-700"  onClick={() => getComments(3)}>GetComments</button>
      <button className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-yellow-700"  onClick={() => deleteComment(98)}>deleteCommentByID</button>
      <button className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-yellow-700"  onClick={() => updateComment(354,commentInfo)}>Edit CommentByID</button>
      <button className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-yellow-700"  onClick={handleMakeSubmitted}>Make Array</button>
      <button className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-yellow-700"  onClick={() => fetchVideos("123123213",2)}>getHomePageVideo</button>
      <button className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-yellow-700"  onClick={handleCreatePlaylist}>createPlaylist</button>
      <button className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-yellow-700"  onClick={handleAddToPlaylist}>addToPlaylist</button>
      <button className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-yellow-700"  onClick={() => getPlaylistVideo(69)}>getPlaylistVideo</button>
      <button className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-yellow-700"  onClick={() => deleteVideoFromPlaylist(69,186)}>deleteVideoFromPlaylist</button>
      <button className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-yellow-700"  onClick={() => getSearchVideo("Winter")}>getSearchVideo</button>
      <button className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-yellow-700"  onClick={() => getCommentsReaction(39)}>getcomment38reaction</button>
      <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-yellow-700"  onClick={() => commentAddLiked(commentLikedInfo2)}>commentLikedInfofalse</button>
      <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-yellow-700"  onClick={() => commentAddLiked(commentLikedInfo)}>commentLikedInfo</button>
      <button className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-yellow-700"  onClick={() => getUserFirstVideo(user)}>getUserFirstVideo</button>
      <button className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-yellow-700"  onClick={() => getSearchVideo("Winter")}>getSearchVideo</button>
      <button className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-yellow-700"  onClick={() => getSearchVideo("Winter")}>getSearchVideo</button>
      <button className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-yellow-700"  onClick={() => handleGeneratingUser()}>registerUser</button>
    </div>
  );
}

export default Register;
