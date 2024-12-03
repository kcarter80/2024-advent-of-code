const readline = require('readline')
const fs = require('fs')

const readInterface = readline.createInterface({
    input: fs.createReadStream('./day-03/input'),
})

let multiplicationsSum = 0
readInterface.on('line', function(line) {
    let currentIndex = 0
    console.log(line)
    while (true) {
        console.log('ci',currentIndex)
        let nextMul = line.indexOf('mul(',currentIndex)
        let nextComma = line.indexOf(',',nextMul+4)
        let nextCloseParen = line.indexOf(')',nextComma+1)
        let nextDont = line.indexOf('don\'t()',currentIndex)
        console.log(nextMul,nextComma,nextCloseParen,nextDont)
        if (nextMul == -1 || nextComma == -1 || nextCloseParen == -1) break
        if (nextDont != -1 && nextCloseParen > nextDont) {
            currentIndex = nextDont + 7
            let nextDo = line.indexOf('do()',currentIndex)
            if (nextDo == -1) break
            else {
                currentIndex = nextDo + 4
                continue
            }    
        }
        let firstNumber = line.substring(nextMul+4,nextComma) 
        let secondNumber = line.substring(nextComma+1,nextCloseParen)
        if (/^\d+$/.test(firstNumber) && /^\d+$/.test(secondNumber)) {
            console.log(firstNumber,secondNumber,parseInt(firstNumber) * parseInt(secondNumber))
            multiplicationsSum += parseInt(firstNumber) * parseInt(secondNumber)
        }
        currentIndex = nextMul + 1
    }

}).on('close', function() {
    console.log(multiplicationsSum)
})