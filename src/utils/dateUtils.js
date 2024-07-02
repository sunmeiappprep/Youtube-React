

import { parseISO, isBefore } from 'date-fns';
export const formatDateDifference = (generatedDate) => {
        const date1 = new Date(generatedDate);
        const date2 = new Date(); 
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    
        if (diffDays < 7) {
          return `${diffDays} day${diffDays > 1 ? 's' : ''}`;
        } else if (diffDays < 30) {
          const weeks = Math.floor(diffDays / 7);
          return `${weeks} week${weeks > 1 ? 's' : ''}`;
        } else if (diffDays < 365) {
          const months = Math.floor(diffDays / 30); 
          return `${months} month${months > 1 ? 's' : ''}`;
        } else {
          const years = Math.floor(diffDays / 365);
          return `${years} year${years > 1 ? 's' : ''}`;
        }
      };
    


      export const isOlderThanHardcodedDate = (date) => {
        // Hardcoded date to 2:15 PM EST (which is 7:15 PM UTC)
        const hardcodedDate = parseISO('2024-07-02T20:15:00-05:00');
        
        // Parse the input date
        const inputDate = parseISO(date);
        // console.log(inputDate,hardcodedDate)
        // Compare the dates
        return isBefore(inputDate, hardcodedDate);
    };