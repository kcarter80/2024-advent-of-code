function testLevels(levels,dampened) {
    for (let i = 0; i < levels.length - 1; i++) {
        let diff = levels[i] - levels[i + 1]
        if (diff == 0) {
            if (dampened) {
                return false
            } else {
                levels.splice(i + 1, 1);
                i--;
                dampened = true;
            }
        } else {
            if (
                (levels[0] > levels[1] && (diff < 1 || diff > 3)) ||
                (levels[0] < levels[1] && (diff > -1 || diff < -3))
            ) {
                if (dampened) {
                    return false
                } else {
                    levels.splice(i + 1, 1);
                    i--;
                    dampened = true;
                }
            }      
        }
    }
    return true
}

const readline = require('readline')
const fs = require('fs')

const readInterface = readline.createInterface({
    input: fs.createReadStream('./day-02/input'),
})

let safeReports = 0
readInterface.on('line', function(line) {
    if (testLevels(line.split(' ').map(num => parseInt(num)), false)) safeReports++
    else if (testLevels(line.split(' ').map(num => parseInt(num)).slice(1), true)) safeReports++
}).on('close', function() {
    console.log(safeReports)
})