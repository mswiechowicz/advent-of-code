fs = require('node:fs')
const input = fs.readFileSync('./input.txt', 'utf8').trimEnd().split('\n');

const times = input[0].match(/\d+/g);
const distances = input[1].match(/\d+/g);

const numbers = [];
for (let i = 0; i < times.length; i++) {
  let waysToWin = [];

  for (let hold = 1; hold < times[i]; hold++) {
    const timeLeft = times[i] - hold;
    const distance = timeLeft * hold;

    if (timeLeft > 0 && distance > +distances[i]) {
      waysToWin.push(hold)
    }
  }
  numbers.push(waysToWin.length)
}

console.log('part1', numbers.reduce((a,b)=>a*b,1));

console.time('part2 duration');
const times2 = input[0].match(/\d+/g).join('');
const distances2 = input[1].match(/\d+/g).join('');

waysToWin = []
for (let hold = 1; hold < times2; hold++) {
  const timeLeft = times2 - hold;
  const distance = timeLeft * hold;

  if (timeLeft > 0 && distance > +distances2) {
    waysToWin.push(hold)
  }
}

console.log('part2', waysToWin.length);

console.timeEnd('part2 duration')
