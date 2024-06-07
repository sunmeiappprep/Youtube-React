
export function convertNumber(num) {
    if (num >= 1 && num <= 999) {
        return num.toString();
    } else if (num >= 1000 && num <= 9999) {
        return (Math.floor(num / 100) / 10).toFixed(1) + 'K';
    } else if (num >= 10000 && num <= 999999) {
        return Math.floor(num / 1000) + 'K';
    } else if (num >= 1000000) {
        return Math.floor(num / 1000000) + 'M';
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