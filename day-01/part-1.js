const readline = require('readline')
const fs = require('fs')

const readInterface = readline.createInterface({
    input: fs.createReadStream('./day-01/input'),
})

let left = new Array
let right = new Array
readInterface.on('line', function(line) {
    left.push(parseInt(line.split('   ')[0]))
    right.push(parseInt(line.split('   ')[1]))
}).on('close', function() {
    left.sort()
    right.sort()
    let sum = 0
    for (let i = 0; i < left.length; i++)
        sum += Math.abs(left[i] - right[i])
    console.log(sum) 
})