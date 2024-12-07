function evaluate(testValue, currentValue, numbers) {
    if (numbers.length == 1) {
        return (currentValue * numbers[0] == testValue) || (currentValue + numbers[0] == testValue)
    } else {
        return evaluate(
            testValue,
            currentValue * numbers[0],
            numbers.slice(1) 
        ) || evaluate(
            testValue,
            currentValue + numbers[0],
            numbers.slice(1) 
        )
    }
}

const readline = require('readline')
const fs = require('fs')

const readInterface = readline.createInterface({
    input: fs.createReadStream('./day-07/input'),
})

let sum = 0
readInterface.on('line', function(line) {
    let numbers = line.split(': ')[1].split(' ').map(item => parseInt(item))
    let testValue = parseInt(line.split(': ')[0])
    if (evaluate(
        testValue,
        numbers[0],
        numbers.slice(1)
    )) {
        sum += testValue
    }   
}).on('close', function() {
    console.log(sum)
})