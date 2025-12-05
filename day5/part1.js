import {readFile} from 'node:fs/promises';

let spoiledIds = [];

async function main() {
    const input = await readFile('./input.txt', {encoding: 'utf8'});
    let [ranges, ids] = input.split('\n\n');
    ranges = ranges.split('\n');
    ids = ids.split('\n').map(Number);

    for (const id of ids) {
        for (const range of ranges) {
            const [start, end] = range.split('-').map(Number);
            if (id >= start && id <= end) {
                spoiledIds.push(id);
                break;
            }
        }
    }

    console.log(spoiledIds.length);
}

main().catch(console.error);
