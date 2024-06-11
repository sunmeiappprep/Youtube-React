// utilities/getColorFromInitial.js
export const getColorFromInitial = (initial) => {
    const colors = ['#FF5722', '#3F51B5', '#4CAF50', '#FFC107', '#009688'];
    const ranges = {
        'A-E': colors[0],
        'F-J': colors[1],
        'K-O': colors[2],
        'P-T': colors[3],
        'U-Z': colors[4]
    };

    const char = initial.toUpperCase();
    if (char >= 'A' && char <= 'E') return ranges['A-E'];
    if (char >= 'F' && char <= 'J') return ranges['F-J'];
    if (char >= 'K' && char <= 'O') return ranges['K-O'];
    if (char >= 'P' && char <= 'T') return ranges['P-T'];
    return ranges['U-Z'];
};