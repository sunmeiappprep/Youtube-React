export function convertNumber(num) {
    if (num >= 1 && num <= 999) {
        return num.toString();
    } else if (num >= 1000 && num <= 9999) {
        return (Math.floor(num / 100) / 10).toFixed(1) + 'K';
    } else if (num >= 10000 && num <= 999999) {
        return Math.floor(num / 1000) + 'K';
    } else if (num >= 1000000) {
        return (Math.floor(num / 100000) / 10).toFixed(1) + 'M';
    } else {
        return '0';
    }
}


export function seededRandom(seed) {
    let x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

export function getSeededRandomNumber(seed) {
    return Math.floor(seededRandom(seed) * 1000) + 1;
}

export function getUsernameBasedRandomNumber(username) {
    const seed = username.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    let randomValue = seededRandom(seed);

    // Use exponential distribution to favor lower numbers
    const maxNumber = 10000000;
    const lambda = 0.000001; // Adjust this value to control the distribution skewness

    // Generate an exponentially distributed number
    let expRandom = -Math.log(1 - randomValue) / lambda;

    // Ensure the number is within the desired range
    let result = Math.floor(expRandom);
    if (result < 1) result = 1;
    if (result > maxNumber) result = maxNumber;

    return result;
}