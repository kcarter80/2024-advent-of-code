function display2DArray(array) {
    if (!Array.isArray(array) || !Array.isArray(array[0])) {
        console.error("Input must be a 2D array.");
        return;
    }

    for (let row of array) {
        console.log(row.join("")); // Join each row's elements with a tab for better formatting
    }
}

const readline = require('readline')
const fs = require('fs')

const readInterface = readline.createInterface({
    input: fs.createReadStream('./day-04/input'),
})

let wordSearch = new Array
readInterface.on('line', function(line) {
    wordSearch.push(line.split(''))
}).on('close', function() {
    let xmasAppearances = 0
    for (let y = 0; y < wordSearch.length; y++) {
        for (let x = 0; x < wordSearch[0].length; x++) {
            if (wordSearch[y][x] == 'A') {
                if (y-1 >= 0 && y+1 < wordSearch.length) {
                    if (wordSearch[y-1][x-1] == 'M' && wordSearch[y-1][x+1] == 'S' && wordSearch[y+1][x-1] == 'M' && wordSearch[y+1][x+1] == 'S') xmasAppearances++
                    if (wordSearch[y-1][x-1] == 'S' && wordSearch[y-1][x+1] == 'M' && wordSearch[y+1][x-1] == 'S' && wordSearch[y+1][x+1] == 'M') xmasAppearances++
                    if (wordSearch[y-1][x-1] == 'M' && wordSearch[y-1][x+1] == 'M' && wordSearch[y+1][x-1] == 'S' && wordSearch[y+1][x+1] == 'S') xmasAppearances++
                    if (wordSearch[y-1][x-1] == 'S' && wordSearch[y-1][x+1] == 'S' && wordSearch[y+1][x-1] == 'M' && wordSearch[y+1][x+1] == 'M') xmasAppearances++
                }
            }
        }
    }
    console.log(xmasAppearances)
    //display2DArray(wordSearch)
})