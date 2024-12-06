const readline = require('readline')
const fs = require('fs')

const readInterface = readline.createInterface({
    input: fs.createReadStream('./day-05/input'),
})

let beforeRules = new Object
let afterRules = new Object
let updates = new Array
readInterface.on('line', function(line) {
    if (line.includes('|')) {
        if (!afterRules.hasOwnProperty(line.split('|')[0])) afterRules[line.split('|')[0]] = [line.split('|')[1]]
        else afterRules[line.split('|')[0]].push(line.split('|')[1])

        if (!beforeRules.hasOwnProperty(line.split('|')[1])) beforeRules[line.split('|')[1]] = [line.split('|')[0]]
        else beforeRules[line.split('|')[1]].push(line.split('|')[0])
    }
    if (line.includes(',')) {
        updates.push(line.split(','))
    }
}).on('close', function() {
    let sum = 0
    for (let i = 0; i < updates.length; i++) {
        let violation = false
        for (let ii = 0; ii < updates[i].length; ii++) {
            let befores = updates[i].slice(0,ii)
            let afters = updates[i].slice(ii+1)
            // check if the pages that must come after it appear before
            if (afterRules[updates[i][ii]] && afterRules[updates[i][ii]].some(page => befores.includes(page)).length) {
                violation = true
                // ii is first index, the swapIndex is:
                let swapIndex = updates[i].indexOf(afterRules[updates[i][ii]].filter(page => befores.includes(page))[0])
                // Swap elements
                let temp = updates[i][ii]
                updates[i][ii] = updates[i][swapIndex]
                updates[i][swapIndex] = temp
                // restart loop
                ii = -1
            }
            // check if the pages that must come before it appear after
            if (beforeRules[updates[i][ii]] && beforeRules[updates[i][ii]].filter(page => afters.includes(page)).length) {
                violation = true
                // ii is first index, the swapIndex is:
                let swapIndex = updates[i].indexOf(beforeRules[updates[i][ii]].filter(page => afters.includes(page))[0])
                // Swap elements
                let temp = updates[i][ii]
                updates[i][ii] = updates[i][swapIndex]
                updates[i][swapIndex] = temp
                // restart loop (needed??)
                ii = -1
            }
        }
        if (violation) sum += parseInt(updates[i][Math.floor(updates[i].length / 2)])
    }
    console.log(sum)
})