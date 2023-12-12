fs = require('node:fs')
const input = fs.readFileSync('./input.txt', 'utf8').trimEnd().split('\n');


function getCardsCounts(cardInstances) {
  const cardsCount = {};

  cardInstances.forEach((n) => {
    cardsCount[n] = (cardsCount[n] || 0) + 1;
  });

  return cardsCount;
}

let part1 = 0;
let part2 = 0;
let cardInstances = [];
input.forEach(l => {
  const numbers = l.split(': ')[1].split(' | ')
  const cardId = l.split(':')[0].split(' ')[1]
  const set1 = numbers[0].trim().split(' ').map(Number);
  const set2 = numbers[1].trim().split(' ').map(Number);

  let points = 0;
  let matching = 0;
  set1.forEach(n => {
    if (set2.includes(n)) {
      if (!points) {
        points += 1;
        matching += 1;
      } else {
        points *= 2;
        matching += 1;
      }
    }
  })

  for (let i = 0; i <= matching; i++) {
    cardInstances.push(+cardId + i)
  }

  for (let i = 1; i < getCardsCounts(cardInstances)[cardId]; i++) {
    for (let j = 1; j <= matching; j++) {
      cardInstances.push(+cardId + j)
    }
  }

  part1 += points;
  points = 0;
})


Object.values(getCardsCounts(cardInstances)).forEach(v => {
  part2 += v;
})

// console.log(getCardsCounts(cardInstances));
console.log('part1:', part1);
console.log('part2:', part2);
