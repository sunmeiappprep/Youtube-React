import React from 'react';

export default function LikedAndDislike({ liked }) {
    const total = liked[0] + liked[1];
    let likedPercentage, dislikedPercentage;
  
    if (total > 0) {
      likedPercentage = (liked[0] / total) * 100;
      dislikedPercentage = 100 - likedPercentage;
    } else {
      likedPercentage = 50;
      dislikedPercentage = 50;
    }
  return (
    <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden">
      <div className="flex h-full">
        <div
          style={{ width: `${likedPercentage}%` }}
          className="bg-green-500 transition-all ease-out duration-500"
        ></div>
        <div
          style={{ width: `${dislikedPercentage}%` }}
          className="bg-red-500 transition-all ease-out duration-500"
        ></div>
      </div>
      <div className="flex justify-between text-sm mt-2">
        <span>{liked[0]} Likes</span>
        <span>{liked[1]} Dislikes</span>
      </div>
    </div>
  );
}
