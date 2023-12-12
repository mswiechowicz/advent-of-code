fs = require('node:fs')

const input = fs.readFileSync('./input.txt', 'utf8').trimEnd().split('\n');

let part1 = 0;
let part2 = 0;
input.forEach(game => {
  const gameId = Number(game.split(':')[0].split(' ')[1]);
  const rounds = game.split(':')[1].split(';')
  // console.log(`round: ${gameId}`);
  let possible = true;
  let bigR = 0
  let bigG = 0
  let bigB = 0
  rounds.forEach(r => {
    r.trimStart()
    // console.log(r)
    const cubes = r.split(',').map(c=> c.trimStart())

    cubes.forEach(cube => {
      const [v, c] = cube.split(' ')
      if(c === 'red' && v > 12) { possible = false }
      if(c === 'green' && v > 13) { possible = false }
      if(c === 'blue' && v > 14) { possible = false }

      if(c === 'red' && v > +bigR) { bigR = v}
      if(c === 'green' && v > +bigG) { bigG = v}
      if(c === 'blue' && v > +bigB) { bigB = v}
    })
  })
  // console.log("gameId", gameId, +bigR, +bigG, +bigB)
  if(possible){
    part1 +=gameId
  }
  part2 += (bigR*bigG*bigB)
})


console.log('part1:', part2)
console.log('part2:', part2)
