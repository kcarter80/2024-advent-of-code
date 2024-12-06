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
let guard = new Object
readInterface.on('line', function(line) {
    situationMap.push(line.split(''))
    if (situationMap[situationMap.length-1].includes('^')) {
        guard.X = situationMap[situationMap.length-1].indexOf('^')
        guard.Y = situationMap.length-1
        guard.direction = 'up'
    }
}).on('close', function() {
    while (evaluateGuard(situationMap,guard)) {}
    display2DArray(situationMap)
    console.log(situationMap.flat().filter(char => char === 'X' || char === '^').length)
})