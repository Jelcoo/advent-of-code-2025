import {readFile} from 'node:fs/promises';

const LENGTH = 12;
let bankJoltage = [];

const parseNmbr = (nmbrs) => {
    return Number(nmbrs.join(''));
}

async function main() {
    const input = await readFile('./input.txt', {encoding: 'utf8'});
    const banks = input.split('\n');

    for (let bank of banks) {
        const digits = bank.split('').map(Number);

        const selected = [];
        let startIndex = 0;

        for (let pos = 0; pos < LENGTH; pos++) {
            const remaining = LENGTH - pos - 1;
            const searchEnd = digits.length - remaining;

            let maxDigit = -1;
            let maxIndex = -1;

            for (let i = startIndex; i < searchEnd; i++) {
                if (digits[i] > maxDigit) {
                    maxDigit = digits[i];
                    maxIndex = i;
                }
            }

            selected.push(maxDigit);
            startIndex = maxIndex + 1;
        }

        const joltage = parseNmbr(selected);
        console.log(bank, joltage);

        bankJoltage.push(joltage);
    }

    if (bankJoltage.length) {
        console.log(bankJoltage.reduce((ps, a) => ps + a));
    }
}

main().catch(console.error);
