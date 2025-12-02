import { readFile } from 'node:fs/promises';

let currentIndex = 50;
let passedZero = 0;

const extractAmount = (rotation) => {
    return parseInt(rotation.substring(1));
};

const reduceIndex = (amount) => {
    for (let i = 0; i < amount; i++) {
        if (currentIndex === 0) {
            currentIndex = 99;
        } else {
            currentIndex--;
        }

        if (currentIndex === 0) {
            passedZero++;
        }
    }
};

const increaseIndex = (amount) => {
    for (let i = 0; i < amount; i++) {
        if (currentIndex === 99) {
            currentIndex = 0;
        } else {
            currentIndex++;
        }

        if (currentIndex === 0) {
            passedZero++;
        }
    }
};

async function main() {
    const input = await readFile('./input.txt', { encoding: 'utf8' });
    const rotations = input.split('\n');

    for (const rotation of rotations) {
        if (rotation.startsWith("L")) {
            reduceIndex(extractAmount(rotation));
        } else if (rotation.startsWith("R")) {
            increaseIndex(extractAmount(rotation));
        } else {
            console.log(`Did not find rotation ${rotation}`);
        }

        console.log(`${rotation} ends on ${currentIndex}`);

        if (currentIndex < 0 || currentIndex > 99) {
            throw new Error(`Index ${currentIndex} is out of bounds`);
        }
    }

    console.log(passedZero);
}

main().catch(console.error);
