fs = require('node:fs')
const input = fs.readFileSync('./input.txt', 'utf8').trimEnd().split('\n');

function isFullHouse([v1, v2]) {
  return v1 === 2 && v2 === 3 || v1 === 3 && v2 === 2;
}

function isTwoPairs(values) {
  let twoCounts = 0;
  if (values.length === 3) {
    values.forEach(v => v === 2 && twoCounts++)
    return twoCounts === 2
  }
}

function isOnePair(values) {
  if (values.length === 4) {
    return values.find(v => v === 2)
  }
}

//Five of a kind 7
//Four of a kind 6
//Full house 5
//Three of a kind 4
//Two pair 3
//One pair 2
//High card 1
function handLevel(hand) {
  const cards = hand.split(' ')[0].split('')
  if (cards.every(c => c === cards[0])) {
    return 7
  }

  const figures = {};
  cards.forEach(card => {
    figures[card] = (figures[card] || 0) + 1
  })
  const values = Object.values(figures);
  if (values.find(v => v === 4)) {
    return 6
  }
  if (isFullHouse(values)) {
    return 5
  }
  if (values.find(v => v === 3)) {
    return 4
  }
  if (isTwoPairs(values)) {
    return 3
  }
  if (isOnePair(values)) {
    return 2
  }
  return 1
}

const hands = []
input.forEach(l => {
  const [cards, bid] = l.split(' ');
  hands.push({cards, bid: +bid, handLevel: handLevel(l)})
})

hands.sort((a, b) => {
  if (a.handLevel !== b.handLevel) {
    return a.handLevel - b.handLevel;
  }

  for (let i = 0; i < 5; i++) {
    const aLetter = a.cards[i];
    const bLetter = b.cards[i];

    const points = {'A': 14, 'K': 13, 'Q': 12, 'J': 11, 'T': 10, 9:9, 8:8, 7:7, 6:6, 5:5, 4:4, 3:3, 2:2};
    let r = points[aLetter] - points[bLetter];
    if(r !== 0) {
      return r
    }
  }
  return 0
});

let part1 = 0;
hands.forEach((h, i) => {
  console.log(h, i+1)
  part1 += h.bid * (i + 1)
})

console.log('part1', part1);
