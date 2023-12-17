fs = require('node:fs')
const grid = [];
const input = fs.readFileSync('../rust/src/input.txt', 'utf8').trimEnd().split('\n');

input.forEach(line => grid.push(line.split('')))

function rotateGrid(grid) {
  const rotated = [];

  for (let col in grid) {
    const newRow = [];
    for (let row in grid) {
      newRow.push(grid[row][col]);
    }
    rotated.push(newRow);
  }

  return rotated
}

const rotatedGrid = rotateGrid(grid);
const gridLen = rotatedGrid.length;
// console.log(rotatedGrid);
for (let col = 0; col < gridLen; col++) {
  for (let i = 0; i < gridLen; i++) {
    for (let row = 0; row < gridLen; row++) {
      if (rotatedGrid[col][row] === '.') {
        if (rotatedGrid[col][row + 1] === 'O') {
          const temp = rotatedGrid[col][row + 1];
          rotatedGrid[col][row + 1] = rotatedGrid[col][row];
          rotatedGrid[col][row] = temp;
        }
      }
      // console.log(rotatedGrid[7][j]);
    }
  }
}


const defaultGrid = rotateGrid(rotatedGrid);
let part1 = 0;

defaultGrid.reverse().forEach((row, idx) => {
  const o_count = row.filter(c => c === 'O').length
  part1 += (idx+1) * o_count;
})

console.log('part1: ', part1);

