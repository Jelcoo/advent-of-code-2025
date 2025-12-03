import {readFile} from 'node:fs/promises';

let bankJoltage = [];

const parseFirstLast = (first, last) => {
    return Number(`${first}${last}`);
}

async function main() {
    const input = await readFile('./input.txt', {encoding: 'utf8'});
    const banks = input.split('\n');

    for (let bank of banks) {
        bank = bank.split('').map(Number);

        let highest = 0;

        for (let i = 0; i < bank.length; i++) {
            for (let j = i + 1; j < bank.length; j++) {
                const joltage = parseFirstLast(bank[i], bank[j]);
                highest = Math.max(highest, joltage);
            }
        }

        bankJoltage.push(highest);
    }

    if (bankJoltage.length) {
        console.log(bankJoltage.reduce((ps, a) => ps + a))
    }
}

main().catch(console.error);
