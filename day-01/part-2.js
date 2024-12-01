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
    let similarity = 0
    for (let i = 0; i < left.length; i++)
        similarity += left[i] * right.filter(item => item === left[i]).length;
    console.log(similarity) 
})