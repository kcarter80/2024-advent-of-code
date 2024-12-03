const readline = require('readline')
const fs = require('fs')

const readInterface = readline.createInterface({
    input: fs.createReadStream('./day-02/input'),
})

let levels
let safeReports = 0
readInterface.on('line', function(line) {
    levels = line.split(' ').map(num => parseInt(num))
    let wasBroken = false
    //console.log(levels)
    for (let i = 0; i < levels.length - 1; i++) {
        let diff = levels[i] - levels[i + 1]
        //console.log(diff)
        if (levels[0] > levels[1]) {
            // decreasing level
            if (diff < 1 || diff > 3) {wasBroken = true; break}
        }
        else if (levels[0] < levels[1]) {
            // increasing level
            if (diff > -1 || diff < -3) {wasBroken = true; break}
        }
        else {
            // not increasing or decreasing
            wasBroken = true; break
        }
    }
    if (!wasBroken) safeReports++
    //console.log(!wasBroken)   
}).on('close', function() {
    console.log(safeReports)
})