import React,{useEffect,useState} from 'react';
import PlaylistTitleAndVideoInfo from '../playlistComp/PlaylistTitleAndVideoInfo';
import NavBar from '../navBar/NavBar';
import UserProfileNavbar from '../UserPageComponent/UserProfileNavbar';
import UserHomeVideoPlaylist from '../UserPageComponent/UserHomeVideoPlaylist';
import { useGlobalState } from '../../StateContext'; 
import Sidebar from '../navBar/Sidebar';
import { useParams } from 'react-router-dom';
import { getUserVideos } from '../../utils/videoUtils';
import { getSubscribers } from '../../utils/subscriptionUtils';
import { getUserById, getUsernameById } from '../../utils/authUtils';
import { getUsernameBasedRandomNumber } from '../../utils/numberUtils';
import { isOlderThanHardcodedDate } from '../../utils/dateUtils';

function UserPage() {
    const { showSubMenu,setShowSubMenu } = useGlobalState(); 
    const { id } = useParams();
    const [videos, setVideos] = useState([]); 
    const [viewTotal, setViewTotal] = useState(); 
    const [subTotal, setSubTotal] = useState(); 
    const [userUsername, setUserUsername] = useState('');
    const [userInfo,setUserInfo] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            try {
       
                const username = await getUsernameById(id);
                setUserUsername(username);
    


                const userInfo = await getUserById(id)
                setUserInfo(userInfo)

                const response = await getSubscribers(id);
                const realSub = response.length;
                if(isOlderThanHardcodedDate(userInfo.createdAt)){
                    setSubTotal(getUsernameBasedRandomNumber(username) + realSub)
                    }
                    else{
                    setSubTotal(realSub)
                    }
                    
    
                if (id) {
                    const videoResponse = await getUserVideos(id);
                    setVideos(videoResponse);
                    if(videoResponse && videoResponse.length > 0){
                        const totalViews = videoResponse.reduce((total, video) => total + video.view, 0);
                        setViewTotal(totalViews);
                    }
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData()
     

    }, [id]);

    useEffect(() => {
        if (userUsername) {
            document.title = `${userUsername} Channel`;
        }
    }, [userUsername]);
    

    useEffect(() => {
        if (window.innerWidth < 900) {
          setShowSubMenu(false);
        } else {
          setShowSubMenu(true);
        }
      }, [setShowSubMenu]);

    //   console.log(userInfo)

    

    return (
        <div className='bg-custom-dark min-h-screen'>
            <div className="relative flex flex-col md:flex-row">
                <div className={`${showSubMenu ? 'w-full md:w-64' : 'w-0'} transition-all duration-300`}>
                    <Sidebar />
                </div>
                <div className={`flex-grow ${showSubMenu ? 'ml-0 md:ml-64' : 'ml-0'} transition-all duration-300`}>
                    <NavBar />
                    <div className="flex flex-col items-center p-4 md:p-6">
                        <div className="max-w-10.5xl w-full">
                            <UserProfileNavbar viewTotal={viewTotal} userUsername={userUsername} subTotal={subTotal}/>
                        </div>
                        <div className="max-w-10.5xl w-full mt-4 md:mt-6">
                            <UserHomeVideoPlaylist videos={videos} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserPage;