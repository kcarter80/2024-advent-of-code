const readline = require('readline')
const fs = require('fs')

const readInterface = readline.createInterface({
  input: fs.createReadStream('./day-10/input'),
})

let topographicMap = new Array
let trailheads = []
const directions = [[-1,0],[1,0],[0,-1],[0,1]]
readInterface.on('line', function (line) {
  topographicMap.push(line.split('').map(num => parseInt(num)))
}).on('close', function () {
  for (let y = 0; y < topographicMap.length; y++) {
    for (let x = 0; x < topographicMap[0].length; x++) {
      if (topographicMap[y][x] == 0) {
        trailheads.push(new Set([`${y},${x}`]))
      }
    }
  }

  for (let step = 1; step <= 9; step++) {
    for(let i = 0; i < trailheads.length; i++) {
      let locations = new Set
      for (const location of trailheads[i]) {
        let locationY = parseInt(location.split(',')[0])
        let locationX = parseInt(location.split(',')[1])
        for (let ii = 0; ii < directions.length; ii++) {
          let newLocationY = locationY + directions[ii][0]
          let newLocationX = locationX + directions[ii][1]
          if (newLocationY >= 0 && newLocationY < topographicMap.length && newLocationX >= 0 && newLocationX < topographicMap[0].length) {
            if (topographicMap[newLocationY][newLocationX] == step) locations.add(`${newLocationY},${newLocationX}`)
          }
        }
      }
      trailheads[i] = locations
    }
  }
  console.log(trailheads)
  console.log(trailheads.reduce((sum, currentSet) => sum + currentSet.size, 0))

})