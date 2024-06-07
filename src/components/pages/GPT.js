// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import NavBar from '../navBar/NavBar';
// import OpenAI from "openai";
// const apiKey2 = 'sk-proj-TDkAmDf2qBu3UBsWl14oT3BlbkFJ3o15ccUfNJakC3pg3psa';
// const apiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';


// const VideoDescriptions = () => {
//     const [videos, setVideos] = useState([
//         { title: "Shadow Raikou Raid Guide: Effective Counters & Tactics in Pokémon GO", user: "User1", description: '' },
//         // Add more videos as needed
//     ]);


 

//     const openai = new OpenAI({
//         apiKey: apiKey2,
//         dangerouslyAllowBrowser:true
//     });

//     async function main() {
//         const stream = await openai.chat.completions.create({
//             model: "gpt-4o",
//             messages: [{ role: "user", content: "Generate a description based on this title: Jang Woojin vs Patrick Franziska | Shadow Raikou Raid Guide: Effective Counters & Tactics in Pokémon GO" }],
//             stream: true,
//         });
    
//         let result = '';
    
//         for await (const chunk of stream) {
//             const content = chunk.choices[0]?.delta?.content || "";
//             result += content;
//         }
    
//         console.log(result);
//     }
    
//     main().catch(console.error);

//     return (
//         <div>
//             <NavBar/>
//         </div>
//     );
// };

// export default VideoDescriptions;
