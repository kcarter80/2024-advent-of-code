function addStone(newStones,stone,quantity) {
  if (newStones[stone]) newStones[stone] += quantity
  else newStones[stone] = quantity
}

const readline = require('readline')
const fs = require('fs')

const readInterface = readline.createInterface({
  input: fs.createReadStream('./day-11/input'),
})


readInterface.on('line', function (line) {
  let stones = new Object
  line.split(' ').map(num => parseInt(num)).forEach((stone) => {if (stones[stone]) {stones[stone]++} else {stones[stone] = 1}})
  
  for (let blinks = 0; blinks < 75; blinks++) {
    console.log('b',blinks)
    //console.log(stones)
    let newStones = new Object
    for (const [stone, quantity] of Object.entries(stones)) {
      if (stone == 0) {
        addStone(newStones,1,quantity)
      } else if (stone.toString().length % 2 == 0) {
        let stoneString = stone.toString()
        const midpoint = stoneString.length / 2
        addStone(newStones,parseInt(stoneString.slice(0, midpoint)),quantity)
        addStone(newStones,parseInt(stoneString.slice(midpoint)),quantity)
      } else {
        addStone(newStones,stone*2024,quantity)
      }
    }
    stones = newStones
  }
  //console.log(stones)
  console.log(Object.values(stones).reduce((acc, curr) => acc + curr, 0))
}).on('close', function () {
  
})