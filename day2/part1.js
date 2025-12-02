import { readFile } from 'node:fs/promises';

let invalidIds = [];

const isInvalid = (number) => {
    return /^(.+)\1$/.test(number);
}

async function main() {
    const input = await readFile('./input.txt', { encoding: 'utf8' });
    const ranges = input.split(',');

    for (const range of ranges) {
        const [start, end] = range.split('-').map(Number);
        for (let i = start; i <= end; i++) {
            if (isInvalid(i.toString())) {
                invalidIds.push(i);
            }
        }
    }

    if (invalidIds.length) {
        console.log(invalidIds.reduce((ps, a) => ps + a))
    }
}

main().catch(console.error);
