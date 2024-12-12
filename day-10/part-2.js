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
        trailheads.push({[`${y},${x}`]:1})
      }
    }
  }

  for (let step = 1; step <= 9; step++) {
    for(let i = 0; i < trailheads.length; i++) {
      let locations = new Object
      for (const location of Object.keys(trailheads[i])) {
        let locationY = parseInt(location.split(',')[0])
        let locationX = parseInt(location.split(',')[1])
        for (let ii = 0; ii < directions.length; ii++) {
          let newLocationY = locationY + directions[ii][0]
          let newLocationX = locationX + directions[ii][1]
          if (newLocationY >= 0 && newLocationY < topographicMap.length && newLocationX >= 0 && newLocationX < topographicMap[0].length) {
            if (topographicMap[newLocationY][newLocationX] == step) {
                if (locations[`${newLocationY},${newLocationX}`]) locations[`${newLocationY},${newLocationX}`] += trailheads[i][location]
                else locations[`${newLocationY},${newLocationX}`] = trailheads[i][location]
            }
          }
        }
      }
      trailheads[i] = locations
    }
  }

  let sum = 0
  for (let i = 0; i < trailheads.length; i++)
      sum += Object.values(trailheads[i]).reduce((sum, value) => sum + value, 0)
  console.log(sum)
})