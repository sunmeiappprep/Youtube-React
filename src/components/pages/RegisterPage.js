// LoginPage.jsx
import React, { useState,useEffect } from 'react';
import { postVideo,getUserVideos,updateVideo,deleteVideo,getVideo, fetchVideos } from '../../utils/videoUtils';
import { addLiked, getLiked } from '../../utils/videoReactionUtils';
import { useGlobalState } from '../../StateContext'; 
import { createComment,getComments,deleteComment, updateComment } from '../../utils/commentUtils';
import { loginUser,logOut } from '../../utils/authUtils';
function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { user,token,setUser, setToken } = useGlobalState(); // Access the context methods
  const [title, setVideoTitle] = useState('');
  const [url, setVideoURL] = useState('');
  const [description, setVideoDescription] = useState('');
  
  console.log(user, token);


  const arr =     [
    "https://www.youtube.com/watch?v=IPoX9QcIBcI",
    "https://www.youtube.com/shorts/bTcAkc_UxTo",
    "https://www.youtube.com/shorts/LFnj8xKcrOQ",
    "https://www.youtube.com/shorts/uVL4vs6kHM4",
    "https://www.youtube.com/shorts/Miu86s0BuO0",
    "https://www.youtube.com/shorts/-_U6aoPEajI",
    "https://www.youtube.com/shorts/Iw1OCyW8ZX8",
    "https://www.youtube.com/shorts/eeQOTcR0i88",
    "https://www.youtube.com/shorts/As6EJjZTgys",
    "https://www.youtube.com/shorts/Sy9pEraQmUk",
    "https://www.youtube.com/shorts/ohQiSIvB2lY",
    "https://www.youtube.com/shorts/dsAHoH4cJsY",
    "https://www.youtube.com/shorts/j_P6Hw8gM7M",
    "https://www.youtube.com/watch?v=0bljsudoQ8E",
    "https://www.youtube.com/watch?v=INI3UoaUsi4",
    "https://www.youtube.com/watch?v=Dg2ffigGcYM",
    "https://www.youtube.com/watch?v=jCzez_q8si0",
    "https://www.youtube.com/watch?v=vt0i6nuqNEo",
    "https://www.youtube.com/watch?v=VsJ7j8HaRIs",
    "https://www.youtube.com/watch?v=abZ15xSBlnM",
    "https://www.youtube.com/watch?v=qCUhSPcoCcU",
    "https://www.youtube.com/watch?v=FkXhKu80CWU",
    "https://www.youtube.com/watch?v=ua1THtX861U",
    "https://www.youtube.com/watch?v=jhkBAKV1yMg",
    "https://www.youtube.com/watch?v=1NGa_Xt77xU",
    "https://www.youtube.com/watch?v=mNHNktxbjdk",
    "https://www.youtube.com/watch?v=i4tNdCV7oZU",
    "https://www.youtube.com/watch?v=bugVg7oH7vU",
    "https://www.youtube.com/watch?v=fo7dWe_xgeo",
    "https://www.youtube.com/watch?v=WISpcvfm00Y",
    "https://www.youtube.com/watch?v=R6-X01AAO0Q",
    "https://www.youtube.com/watch?v=v5L_o7lQcqc",
    "https://www.youtube.com/watch?v=Wdjh81uH6FU",
    "https://www.youtube.com/watch?v=qhZ-oq-wMjk",
    "https://www.youtube.com/watch?v=MR2OVbmCWYI",
    "https://www.youtube.com/watch?v=vWIzeSA4l-0",
    "https://www.youtube.com/watch?v=LIyprdaNUTE",
    "https://www.youtube.com/watch?v=bKrOknHPdtc",
    "https://www.youtube.com/watch?v=i6ppANpYiAc",
    "https://www.youtube.com/watch?v=LrIRuqr_Ozg",
    "https://www.youtube.com/watch?v=DDNnb8rJYMw",
    "https://www.youtube.com/watch?v=BNiTVsAlzlc",
    "https://www.youtube.com/watch?v=GHqwK-_osLs",
    "https://www.youtube.com/watch?v=86QotWbjLtw",
    "https://www.youtube.com/watch?v=w7B2yJsN39c",
    "https://www.youtube.com/watch?v=2-pWQP71RYQ",
    "https://www.youtube.com/watch?v=60tLU61bUNQ",
    "https://www.youtube.com/watch?v=d2kWnsLe01U",
    "https://www.youtube.com/watch?v=RglPFY6xh6c",
    "https://www.youtube.com/watch?v=wlo5YynHQ4Q",
    "https://www.youtube.com/watch?v=kxsQeGEI-vU",
    "https://www.youtube.com/watch?v=WCli0gyNwL0",
    "https://www.youtube.com/watch?v=4xDzrJKXOOY",
    "https://www.youtube.com/watch?v=G6lN_VVaqdA",
    "https://www.youtube.com/watch?v=h7Aj-yU7Pao",
    "https://www.youtube.com/watch?v=Zk0M7aXaiGg",
    "https://www.youtube.com/watch?v=LJe_tmYHWYA",
    "https://www.youtube.com/watch?v=4HVqC4zEPDc",
    "https://www.youtube.com/watch?v=6ChQhIzUXr4",
    "https://www.youtube.com/watch?v=wQnxGySg6Zg",
    "https://www.youtube.com/watch?v=zhwdBWLZzss",
    "https://www.youtube.com/watch?v=ggqXttEhWlY",
    "https://www.youtube.com/watch?v=bSpOU-5aq-8",
    "https://www.youtube.com/watch?v=9f7mxx2qghc",
    "https://www.youtube.com/watch?v=u0e_grWEcB0",
    "https://www.youtube.com/watch?v=35kwlY_RR08",
    "https://www.youtube.com/watch?v=vF0t1NEjr6s",
    "https://www.youtube.com/watch?v=2-pWQP71RYQ",
    "https://www.youtube.com/watch?v=60tLU61bUNQ",
    "https://www.youtube.com/watch?v=d2kWnsLe01U",
    "https://www.youtube.com/watch?v=RglPFY6xh6c",
    "https://www.youtube.com/watch?v=wlo5YynHQ4Q",
    "https://www.youtube.com/watch?v=kxsQeGEI-vU",
    "https://www.youtube.com/watch?v=WCli0gyNwL0",
    "https://www.youtube.com/watch?v=4xDzrJKXOOY",
    "https://www.youtube.com/watch?v=G6lN_VVaqdA",
    "https://www.youtube.com/watch?v=h7Aj-yU7Pao",
    "https://www.youtube.com/watch?v=Zk0M7aXaiGg",
    "https://www.youtube.com/watch?v=LJe_tmYHWYA",
    "https://www.youtube.com/watch?v=4HVqC4zEPDc",
    "https://www.youtube.com/watch?v=6ChQhIzUXr4",
    "https://www.youtube.com/watch?v=wQnxGySg6Zg",
    "https://www.youtube.com/watch?v=zhwdBWLZzss",
    "https://www.youtube.com/watch?v=ggqXttEhWlY",
    "https://www.youtube.com/watch?v=bSpOU-5aq-8",
    "https://www.youtube.com/watch?v=9f7mxx2qghc",
    "https://www.youtube.com/watch?v=u0e_grWEcB0",
    "https://www.youtube.com/watch?v=35kwlY_RR08",
    "https://www.youtube.com/watch?v=vF0t1NEjr6s",
    "https://www.youtube.com/watch?v=CXGCe-goCvY",
    "https://www.youtube.com/watch?v=qC2ZieUE30Q",
    "https://www.youtube.com/watch?v=SuIqaxC9vAY",
    "https://www.youtube.com/watch?v=SuIqaxC9vAY",
    "https://www.youtube.com/watch?v=lNe1D_E3R8E",
    "https://www.youtube.com/watch?v=Qzlt1VVBcg8",
    "https://www.youtube.com/watch?v=CK60Jjh42uE",
    "https://www.youtube.com/watch?v=WoYEh10RFVs",
    "https://www.youtube.com/watch?v=bjlzyvrmwMc",
    "https://www.youtube.com/watch?v=H6k24wofCU4",
    "https://www.youtube.com/watch?v=U-VVphC-90k",
    "https://www.youtube.com/watch?v=wb6zZfakPJ0",
    "https://www.youtube.com/watch?v=gYNj9V4CvPM",
    "https://www.youtube.com/watch?v=ouEzZbj1BkQ",
    "https://www.youtube.com/watch?v=7FojR16XXMo",
    "https://www.youtube.com/watch?v=pL1tYz11hmk",
    "https://www.youtube.com/watch?v=gpdwJudCTlQ",
    "https://www.youtube.com/watch?v=ggWZoH9PeIU",
    "https://www.youtube.com/watch?v=0XveLRlYgNI",
    "https://www.youtube.com/watch?v=VOw-CJXKMGQ",
    "https://www.youtube.com/watch?v=mlSSE3MV63I",
    "https://www.youtube.com/watch?v=9OvibwfflDg",
    "https://www.youtube.com/watch?v=et6rRoMOySA",
    "https://www.youtube.com/watch?v=iaR53L2CFN0",
    "https://www.youtube.com/watch?v=7jUOoIkDYP0",
    "https://www.youtube.com/watch?v=p-5dMoulSh0",
    "https://www.youtube.com/watch?v=krsBRQbOPQ4",
    "https://www.youtube.com/watch?v=FigThBykbhI",
    "https://www.youtube.com/watch?v=GRgSEOvltFI",
    "https://www.youtube.com/watch?v=V6gkYw5aktk",
    "https://www.youtube.com/watch?v=i9DTgdR2vtc",
    "https://www.youtube.com/watch?v=JN3KPFbWCy8",
    "https://www.youtube.com/watch?v=ozj4T5M5GTk",
    "https://www.youtube.com/watch?v=VME4T0sFlV4",
    "https://www.youtube.com/watch?v=OmsBZY-sOvk",
    "https://www.youtube.com/watch?v=E5zc7jFSl7w",
    "https://www.youtube.com/watch?v=6xWXRk3yaSw",
    "https://www.youtube.com/watch?v=MJf_R2hxvSc",
    "https://www.youtube.com/watch?v=pH0ewp4NqwU",
    "https://www.youtube.com/watch?v=gf8cu84JXMA",
    "https://www.youtube.com/watch?v=s31O01BYGWw",
    "https://www.youtube.com/watch?v=cA4wVhs3HC0",
    "https://www.youtube.com/watch?v=R3DetEyUnNM",
    "https://www.youtube.com/watch?v=J-QmddJ-8mk",
    "https://www.youtube.com/watch?v=67nM1K9q3Sk",
    "https://www.youtube.com/watch?v=2_S8-0UfkUA",
    "https://www.youtube.com/watch?v=NTNx9NFlnmo",
    "https://www.youtube.com/watch?v=TPWYQ94Ief4",
    "https://www.youtube.com/watch?v=c2ppreiB1PQ",
]

    const handleMakeSubmitted = () =>{
      for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        const videoInfo = {
          title: 'wdwdw',
          url: element,
          description: 'asdas.'
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


  useEffect(() => {
    console.log("Updated global state user:", user);
    console.log("Updated global state token:", token);
  }, [user, token]); // This effect runs when `user` or `token` changes

  const  handleSubmitLogin  = async (event) => {
    event.preventDefault();
    // Handle the login logic here
    let data = await loginUser("asdasd2@gmail.com", 'asdasd')
    console.log(data)
    setUser(data.user.id)
    setToken(data.jwtToken)
    // You would replace the above console.log with your login logic
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

  return (
    <div className="flex-wrap justify-center items-center h-screen ">
      <button  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"  onClick={() => { postVideo(videoInfo); }}>Post Video</button>
      <button  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"  onClick={() => { getUserVideos(user); }}>Get User Video</button>
      <button  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-yellow-700"  onClick={() => handleUpdateVideo()}>Update Video</button>
      <button  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-yellow-700"  onClick={() => deleteVideo(289)}>Delete Video</button>
      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-yellow-700"  onClick={() => getVideo(3)}>Get Video info</button>
      <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-yellow-700"  onClick={() => addLiked(likedInfo)}>addLiked</button>
      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-yellow-700"  onClick={() => getLiked(3)}>getLiked</button>
      <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-yellow-700"  onClick={() => createComment(commentInfo)}>addComment</button>
      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-yellow-700"  onClick={handleSubmitLogin}>Login</button>
      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-yellow-700"  onClick={() => logOut()}>Logout</button>
      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-yellow-700"  onClick={() => getComments(3)}>GetComments</button>
      <button className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-yellow-700"  onClick={() => deleteComment(98)}>deleteCommentByID</button>
      <button className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-yellow-700"  onClick={() => updateComment(354,commentInfo)}>Edit CommentByID</button>
      <button className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-yellow-700"  onClick={handleMakeSubmitted}>Make Array</button>
      <button className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-yellow-700"  onClick={() => fetchVideos("123123213",2)}>getHomePageVideo</button>

    </div>
  );
}

export default Register;
