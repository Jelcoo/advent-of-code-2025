import { readFile } from 'node:fs/promises';

const checkAdjacent = (playfield, rowI, colI) => {
    const offsets = [
        [-1, -1], [-1, 0], [-1, 1],
        [ 0, -1],          [ 0, 1],
        [ 1, -1], [ 1, 0], [ 1, 1],
    ];

    return offsets.map(([rOff, cOff]) =>
        playfield[rowI + rOff]?.[colI + cOff]
    );
};

async function main() {
    const input = await readFile('./input.txt', { encoding: 'utf8' });
    const rows = input.split('\n');

    let playfield = [];
    for (const row of rows) {
        playfield.push(row.split(''));
    }

    let accessible = 0;

    for (let rowI = 0; rowI < playfield.length; rowI++) {
        const row = playfield[rowI];
        for (let colI = 0; colI < row.length; colI++) {
            const col = row[colI];
            if (col === '@') {
                if (checkAdjacent(playfield, rowI, colI).filter(val => val === '@').length < 4) {
                    accessible++;
                }
            }
        }
    }

    console.log(accessible);
}

main().catch(console.error);
