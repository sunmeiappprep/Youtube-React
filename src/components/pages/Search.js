import React, { useEffect, useState } from 'react'
import { getSearchVideo } from '../../utils/videoUtils'
import { useParams } from 'react-router-dom';
function Search() {
    let  { searchTerm } = useParams();
    searchTerm = decodeURIComponent(searchTerm);
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        getSearchVideo(searchTerm).then(setVideos);
    }, [searchTerm]);


    return (
        <div>
            <h1>Search Results for: {searchTerm}</h1>
        </div>
    )
}

export default Search