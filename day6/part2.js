import { readFile } from 'node:fs/promises';

let operations = [];

async function main() {
    const input = await readFile('./input.txt', { encoding: 'utf8' });
    const lines = input.split('\n');
    const operators = lines
        .pop()
        .replace(/\s{2,}/g, '')
        .split('')
        .reverse();

    const height = lines.length;
    const width = Math.max(...lines.map(l => l.length));

    // Make lines same width
    const grid = lines.map(line => line.padEnd(width, ' '));

    let current = null;

    for (let x = width - 1; x >= 0; x--) {
        const operatorChar = operators[operations.length];

        if (operatorChar && current) {
            current.operator = operatorChar;
        }

        // check if column is spaces (new digit col)
        let isEmptyColumn = true;
        for (let y = 0; y < height; y++) {
            if (grid[y][x] !== ' ') {
                isEmptyColumn = false;
                break;
            }
        }

        if (isEmptyColumn) {
            if (current !== null) {
                operations.push(current);
                current = null;
            }
            continue;
        }

        if (current === null) {
            current = {
                operator: operatorChar,
                numbers: []
            };
        }

        // get digits from col
        let numChars = '';
        for (let y = 0; y < height; y++) {
            const colChar = grid[y][x];
            if (colChar !== ' ') {
                numChars += colChar;
            }
        }

        if (numChars.length > 0) {
            current.numbers.push(Number(numChars));
        }
    }

    if (current !== null) {
        operations.push(current);
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
