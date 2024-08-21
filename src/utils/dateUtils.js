

import { parseISO, isBefore } from 'date-fns';
export const formatDateDifference = (generatedDate) => {
  const date1 = new Date(generatedDate);
  const date2 = new Date(); 
  const diffTime = Math.abs(date2 - date1);

  const diffSeconds = Math.floor(diffTime / 1000);
  const diffMinutes = Math.floor(diffTime / (1000 * 60));
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffSeconds < 60) {
      return "Less than 1 minute";
  } else if (diffMinutes < 60) {
      return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''}`;
  } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''}`;
  } else if (diffDays < 7) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''}`;
  } else if (diffDays < 30) {
      return `${diffWeeks} week${diffWeeks > 1 ? 's' : ''}`;
  } else if (diffDays < 365) {
      return `${diffMonths} month${diffMonths > 1 ? 's' : ''}`;
  } else {
      return `${diffYears} year${diffYears > 1 ? 's' : ''}`;
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