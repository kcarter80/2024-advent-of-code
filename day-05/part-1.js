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
        console.log('update pages',updates[i])
        let violation = false
        for (let ii = 0; ii < updates[i].length; ii++) {
            console.log('update page',updates[i][ii])
            let befores = updates[i].slice(0,ii)
            let afters = updates[i].slice(ii+1)
            console.log('befores',befores)
            console.log('b',beforeRules[updates[i][ii]])
            console.log('afters',afters)
            console.log('a',afterRules[updates[i][ii]])
            // check if the pages that must come after it appear before
            if (afterRules[updates[i][ii]] && afterRules[updates[i][ii]].some(page => befores.includes(page))) {
                violation = true
                break
            }
            // check if the pages that must come before it appear after
            if (beforeRules[updates[i][ii]] && beforeRules[updates[i][ii]].some(page => afters.includes(page))) {
                violation = true
                break
            }
        }
        if (!violation) sum += parseInt(updates[i][Math.floor(updates[i].length / 2)])
    }
    console.log(sum)
})