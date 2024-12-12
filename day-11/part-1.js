const readline = require('readline')
const fs = require('fs')

const readInterface = readline.createInterface({
  input: fs.createReadStream('./day-11/input'),
})


readInterface.on('line', function (line) {
  let stones = line.split(' ').map(num => parseInt(num))
  
  for (let blinks = 0; blinks < 25; blinks++) {
    let newStones = new Array
    //console.log(stones)
    for (let i = 0; i < stones.length; i++) {
      if (stones[i] == 0) {
        newStones.push(1)
      } else if (stones[i].toString().length % 2 == 0) {
        let stoneString = stones[i].toString()
        const midpoint = stoneString.length / 2;
        newStones.push(parseInt(stoneString.slice(0, midpoint)))
        newStones.push(parseInt(stoneString.slice(midpoint)))
      } else {
        newStones.push(stones[i] * 2024)
      }
    }
    stones = newStones
  }
  console.log(stones.length)
}).on('close', function () {
  
})