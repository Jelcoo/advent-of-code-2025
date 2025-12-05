import {readFile} from 'node:fs/promises';

let freshIds = new Set();

async function main() {
    const input = await readFile("./input.txt", "utf8");
    const [ranges] = input.split("\n\n");

    const intervals = ranges
        .split("\n")
        .map(line => line.split("-").map(Number))
        .sort((a, b) => a[0] - b[0]);

    const merged = [];

    for (const [start, end] of intervals) {
        if (merged.length === 0) {
            merged.push([start, end]);
            continue;
        }

        const last = merged[merged.length - 1];

        if (start <= last[1] + 1) {
            last[1] = Math.max(last[1], end);
        } else {
            merged.push([start, end]);
        }
    }

    let total = 0;
    for (const [start, end] of merged) {
        total += (end - start + 1);
    }

    console.log(total);
}

main().catch(console.error);
