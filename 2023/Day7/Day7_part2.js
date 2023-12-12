fs = require('node:fs')
const input = fs.readFileSync('./input.txt', 'utf8').trimEnd().split('\n');

//Five of a kind 7
//Four of a kind 6
//Full house 5
//Three of a kind 4
//Two pair 3
//One pair 2
//High card 1
function handLevel(hand) {
  const cards = hand.split(' ')[0].split('')
  const j = cards.filter(c => c === "J").length;

  const figures = {};
  cards.forEach(card => {
    if(card !== "J") {
      figures[card] = (figures[card] || 0) + 1
    }
  })
  const values = Object.values(figures).sort((a,b) => b-a);
  const [v0,v1] = values;
  // console.log(cards.join(''), v0, v1, 'j: ',j);
  if (j === 5 || v0 === 5 || v0 + j === 5) {
    return 7
  }
  if (v0 === 4 || v0 + j === 4) {
    return 6
  }
  if (v0 === 3 && v1 === 2 || v0 + j === 3 && v1 === 2) {
    return 5
  }
  if (v0 === 3 || v0 + j === 3) {
    return 4
  }
  if (v0 === 2 && v1 === 2 || v1 === 2 && v0 + j === 2) {
    return 3
  }
  if (v0 === 2 || v0 +j === 2) {
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

    const points = {'A': 14, 'K': 13, 'Q': 12, 'J': 1, 'T': 10, 9: 9, 8: 8, 7: 7, 6: 6, 5: 5, 4: 4, 3: 3, 2: 2};
    let r = points[aLetter] - points[bLetter];
    if (r !== 0) {
      return r
    }
  }
  return 0
});

let part2 = 0;

hands.forEach((h, i) => {
  part2 += h.bid * (i + 1)
})

console.log('part2', part2);
