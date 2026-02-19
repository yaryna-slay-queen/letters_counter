import { createReadStream } from 'node:fs';
const symbolCounter = {};

const stream = createReadStream('text.txt', {
    encoding: 'utf8',
    highWaterMark: 100,
});

stream.on('data', (chunk) => {
    const str = chunk.toString();

    for (let i = 0; i < str.length; i++) {
        if (symbolCounter[str[i]]) {
            symbolCounter[str[i]]++;
        } else {
            symbolCounter[str[i]] = 1;
        }
    }
});

stream.on('end', () => {
    console.table(Object.entries(symbolCounter).sort((a, b) => b[1] - a[1]));
});