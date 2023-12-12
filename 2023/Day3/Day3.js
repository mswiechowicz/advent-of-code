fs = require('node:fs')

const grid = fs.readFileSync('./input.txt', 'utf8').trimEnd().split('\n');
const ROWS = grid.length

function getNumber({y, xStart, xEnd}) {
  let number = '';
  for (let i = xStart; i <= xEnd; i++) {
    number += grid[y][i]
  }
  return +number;
}

function getNeighbours({y, xStart, xEnd}) {
  const neighbours = [];

  for (let x = xStart; x <= xEnd; x++) {
    neighbours.push(grid[y][xStart - 1])
    neighbours.push(grid[y][xEnd + 1])

    if (y - 1 > 0) {
      neighbours.push(grid[y - 1][x])
      neighbours.push(grid[y - 1][x + 1])
      neighbours.push(grid[y - 1][x - 1])
    }
    if (y + 1 < ROWS) {
      neighbours.push(grid[y + 1][x])
      neighbours.push(grid[y + 1][x + 1])
      neighbours.push(grid[y + 1][x - 1])
    }
  }

  return new Set(
    [...neighbours].filter(Boolean).filter(s => s !== '.' && isNaN(+s))
  );
}

function getNeighboursWithPointers({y, xStart, xEnd}) {
  const neighbours = [];

  for (let x = xStart; x <= xEnd; x++) {
    neighbours.push({value: grid[y][xStart - 1], x: xStart - 1, y: y})
    neighbours.push({value: grid[y][xEnd + 1], x: xEnd + 1, y: y})

    if (y - 1 > 0) {
      neighbours.push({value: grid[y - 1][x], x: x, y: y - 1})
      neighbours.push({value: grid[y - 1][x + 1], x: x + 1, y: y - 1})
      neighbours.push({value: grid[y - 1][x - 1], x: x - 1, y: y - 1})
    }
    if (y + 1 < ROWS) {
      neighbours.push({value: grid[y + 1][x], x: x, y: y + 1})
      neighbours.push({value: grid[y + 1][x + 1], x: x + 1, y: y + 1})
      neighbours.push({value: grid[y + 1][x - 1], x: x - 1, y: y + 1})
    }
  }

  return Array.from(
    new Set([...neighbours].filter(s => Boolean(s.value)).filter(s => s.value !== '.' && isNaN(+s.value)).map(JSON.stringify)),
    JSON.parse
  );
}


function solve(part = 'part1') {
  const numbers = [];
  let digit = false;
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (!isNaN(+grid[y][x])) {
        if (digit === false) {
          digit = {y: y, xStart: x};
        }
        if (isNaN(+grid[y][x + 1])) {
          digit.xEnd = x;
          digit.number = getNumber(digit)
          digit.neighbours = part === 'part1'
            ? getNeighbours(digit)
            : getNeighboursWithPointers(digit)
          numbers.push(digit)
          digit = false;
        }
      }
    }
  }

  if (part === 'part2') {
    const seen = []
    let part2 = 0;
    numbers.filter(n => n.neighbours.length).forEach(n => {
      seen.push(n);
      const {x, y} = n.neighbours[0];
      const alreadySeen = seen.find(s => {
        const {x: seenX, y: seenY} = s.neighbours[0]
        return x === seenX && y === seenY && n.number !== s.number
      })
      if(alreadySeen) {
        part2 += n.number * alreadySeen.number
      }
    })
    return part2;
  }

  if (part === 'part1') {
    return numbers.reduce((a, b) => b.neighbours.size > 0 ? a + b.number : a, 0);
  }

}

console.log('part1: ', solve('part1'));
console.log('part2: ', solve('part2'));
