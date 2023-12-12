fs = require('node:fs')
const input = fs.readFileSync('./input.txt', 'utf8').trimEnd().split('\n');

function part1(input) {
  let count = 0 ;
  input.forEach(el => {
    const row = el.replace(/[^0-9]/g, '');
    const value = row[0] + row.at(-1)
    count +=Number(value);
  });
  return count;
}

function part2(input) {
  const numberWordsMap = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9
  }

  let count = 0;
  input.forEach(l => {
    const digits = l.split('').map((char, index) => {
      const remaining = l.slice(index);
      for (const word in numberWordsMap) {
        if (remaining.startsWith(word)) {
          return numberWordsMap[word];
        }
      }
      return parseInt(char);
    }).filter(num => !isNaN(num));

    count += Number('' + digits[0] + digits.at(-1))
  })
  return count;
}

console.log('part1', part1(input))
console.log('part2', part2(input))
