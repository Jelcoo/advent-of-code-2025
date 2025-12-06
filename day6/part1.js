import { readFile } from 'node:fs/promises';

let operations = [];

async function main() {
    const input = await readFile('./input.txt', { encoding: 'utf8' });
    const lines = input
        .split('\n')
        .map(line => line
            .trim()
            .replace(/\s{2,}/g, ' ')
            .split(' ')
        );
    const operators = lines.pop();

    for (let i = 0; i < operators.length; i++) {
        operations.push({
            operator: operators[i],
            numbers: lines.map(line => line[i]).map(Number)
        });
    }

    let sum = 0;
    for (const operation of operations) {
        if (operation.operator === '+') {
            sum += operation.numbers.reduce((ps, a) => ps + a);
        } else if (operation.operator === '*') {
            sum += operation.numbers.reduce((ps, a) => ps * a);
        }
    }

    console.log(sum);
}

main().catch(console.error);
