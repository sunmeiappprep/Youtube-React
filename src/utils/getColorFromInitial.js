export const getColorFromInitial = (initial) => {
    const colors = [
        '#FF5722', '#3F51B5', '#4CAF50', '#FFC107', '#009688',
        '#9C27B0', '#FF9800', '#8BC34A', '#2196F3', '#00BCD4',
        '#E91E63', '#CDDC39', '#673AB7', '#FFEB3B', '#795548',
        '#607D8B', '#FF5252', '#304FFE', '#00E676', '#FFEA00',
        '#00BFA5', '#D500F9', '#FF6D00', '#64DD17', '#0091EA',
        '#AA00FF', '#AEEA00', '#6200EA', '#FFD600', '#BF360C'
    ];

    const ranges = {
        'A': colors[0],  'B': colors[1],  'C': colors[2],  'D': colors[3],  'E': colors[4],
        'F': colors[5],  'G': colors[6],  'H': colors[7],  'I': colors[8],  'J': colors[9],
        'K': colors[10], 'L': colors[11], 'M': colors[12], 'N': colors[13], 'O': colors[14],
        'P': colors[15], 'Q': colors[16], 'R': colors[17], 'S': colors[18], 'T': colors[19],
        'U': colors[20], 'V': colors[21], 'W': colors[22], 'X': colors[23], 'Y': colors[24],
        'Z': colors[25], '0': colors[26], '1': colors[27], '2': colors[28], '3': colors[29],
        '4': colors[0],  '5': colors[1],  '6': colors[2],  '7': colors[3],  '8': colors[4],  '9': colors[5]
    };

    const char = initial.toUpperCase();
    return ranges[char] || colors[Math.floor(Math.random() * colors.length)];
};
