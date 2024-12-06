function display2DArray(array) {
    if (!Array.isArray(array) || !Array.isArray(array[0])) {
        console.error("Input must be a 2D array.")
        return
    }

    for (let row of array) {
        console.log(row.join(""))
    }
}

function evaluateGuard(situationMap,guard) {
    if (guard.direction == 'up') {
        if (guard.Y - 1 < 0) return false
        // obstacle
        else if (situationMap[guard.Y - 1][guard.X] == '#') {
            guard.direction = 'right'
        // no obstacle
        } else {
            guard.Y -= 1
            situationMap[guard.Y][guard.X] = 'X'
        }
        return true
    }

    if (guard.direction == 'right') {
        if (guard.X + 1 > situationMap[0].length - 1) return false
        // obstacle
        else if (situationMap[guard.Y][guard.X + 1] == '#') {
            guard.direction = 'down'
        // no obstacle
        } else {
            guard.X += 1
            situationMap[guard.Y][guard.X] = 'X'
        }
        return true
    }

    if (guard.direction == 'down') {
        if (guard.Y + 1 > situationMap.length - 1) return false
        // obstacle
        else if (situationMap[guard.Y + 1][guard.X] == '#') {
            guard.direction = 'left'
        // no obstacle
        } else {
            guard.Y += 1
            situationMap[guard.Y][guard.X] = 'X'
        }
        return true
    }

    if (guard.direction == 'left') {
        if (guard.X - 1 < 0) return false
        // obstacle
        else if (situationMap[guard.Y][guard.X - 1] == '#') {
            guard.direction = 'up'
        // no obstacle
        } else {
            guard.X -= 1
            situationMap[guard.Y][guard.X] = 'X'
        }
        return true
    }
}

const readline = require('readline')
const fs = require('fs')

const readInterface = readline.createInterface({
    input: fs.createReadStream('./day-06/input'),
})

let situationMap = new Array
let initialGuard = new Object
readInterface.on('line', function(line) {
    situationMap.push(line.split(''))
    if (situationMap[situationMap.length-1].includes('^')) {
        initialGuard.X = situationMap[situationMap.length-1].indexOf('^')
        initialGuard.Y = situationMap.length-1
        initialGuard.direction = 'up'
    }
}).on('close', function() {
    let loops = 0
    
    for (let y = 0; y < situationMap.length; y++) {
        for (let x = 0; x < situationMap[0].length; x++) {
            if (situationMap[y][x] != '#' && situationMap[y][x] != '^') {
                console.log(1)
                let obstacleInsertedMap = structuredClone(situationMap)
                obstacleInsertedMap[y][x] = '#'
                let guard = structuredClone(initialGuard)
                let guardStates = [`${initialGuard.X},${initialGuard.Y},${initialGuard.direction}`]
                while (evaluateGuard(obstacleInsertedMap,guard)) {
                    if (guardStates.includes(`${guard.X},${guard.Y},${guard.direction}`)) {
                        loops += 1
                        break
                    } else {
                        guardStates.push(`${guard.X},${guard.Y},${guard.direction}`)
                    }
                }
            }
        }
    }
    console.log(loops)
})