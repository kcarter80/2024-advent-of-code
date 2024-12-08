function display2DArray(array) {
    if (!Array.isArray(array) || !Array.isArray(array[0])) {
        console.error("Input must be a 2D array.")
        return
    }

    for (let row of array) {
        console.log(row.join(""))
    }
}

function displayObjectKeysAndValues(obj, indent = 0) {
    for (const key in obj) {
      const value = obj[key];
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        console.log(' '.repeat(indent) + `${key}:`); // Display key for nested object
        displayObjectKeysAndValues(value, indent + 2); // Recursively call for nested objects
      } else {
        console.log(' '.repeat(indent) + `${key}: ${value}`); // Display key and value
      }
    }
  }

const readline = require('readline')
const fs = require('fs')

const readInterface = readline.createInterface({
    input: fs.createReadStream('./day-08/input'),
})

let antennas = new Object
let antinodes = new Set
let maxX, maxY
let y = 0
readInterface.on('line', function(line) {
    let mapLine = line.split('')
    maxX = mapLine.length - 1
    for (let x = 0; x < mapLine.length; x++) {
        if (mapLine[x] != '.') {
            if (antennas[mapLine[x]]) {
                antennas[mapLine[x]].push([x,y])
            } else {
                antennas[mapLine[x]] = [[x,y]]
            }
        }      
    }
    y++
}).on('close', function() {
    maxY = y - 1
    displayObjectKeysAndValues(antennas)
    Object.entries(antennas).forEach(([antenna, coords]) => {
        for (let i = 0; i < coords.length; i++) {
            for (let ii = i + 1; ii < coords.length; ii++) {
                let xDistance = coords[i][0] - coords[ii][0]
                let yDistance = coords[i][1] - coords[ii][1]
                //console.log(`Pair: (${coords[i]}, ${coords[ii]})`,xDistance,yDistance)
                let antinode1 = [coords[i][0] + xDistance,coords[i][1] + yDistance]
                let antinode2 = [coords[ii][0] - xDistance,coords[ii][1] - yDistance]
                //console.log(`an1: (${antinode1[0]}, ${antinode1[1]})`)
                //console.log(`an2: (${antinode2[0]}, ${antinode2[1]})`)
                if (antinode1[0] >= 0 && antinode1[0] <= maxX && antinode1[1] >= 0 && antinode1[1] <= maxY) {
                    antinodes.add(`${antinode1[0]},${antinode1[1]}`)
                }
                if (antinode2[0] >= 0 && antinode2[0] <= maxX && antinode2[1] >= 0 && antinode2[1] <= maxY) {
                    antinodes.add(`${antinode2[0]},${antinode2[1]}`)
                }
            }
        }
    })
    console.log(antinodes.size)
})