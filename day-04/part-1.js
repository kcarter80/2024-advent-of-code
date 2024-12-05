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
            if (wordSearch[y][x] == 'X') {
                if (wordSearch[y][x+1] == 'M' && wordSearch[y][x+2] == 'A' && wordSearch[y][x+3] == 'S') xmasAppearances++
                if (wordSearch[y][x-1] == 'M' && wordSearch[y][x-2] == 'A' && wordSearch[y][x-3] == 'S') xmasAppearances++
                if (y+3 < wordSearch.length && wordSearch[y+1][x] == 'M' && wordSearch[y+2][x] == 'A' && wordSearch[y+3][x] == 'S') xmasAppearances++
                if (y-3 >= 0 && wordSearch[y-1][x] == 'M' && wordSearch[y-2][x] == 'A' && wordSearch[y-3][x] == 'S') xmasAppearances++
                if (y+3 < wordSearch.length && wordSearch[y+1][x+1] == 'M' && wordSearch[y+2][x+2] == 'A' && wordSearch[y+3][x+3] == 'S') xmasAppearances++
                if (y-3 >= 0 && wordSearch[y-1][x+1] == 'M' && wordSearch[y-2][x+2] == 'A' && wordSearch[y-3][x+3] == 'S') xmasAppearances++
                if (y-3 >= 0 && wordSearch[y-1][x-1] == 'M' && wordSearch[y-2][x-2] == 'A' && wordSearch[y-3][x-3] == 'S') xmasAppearances++
                if (y+3 < wordSearch.length && wordSearch[y+1][x-1] == 'M' && wordSearch[y+2][x-2] == 'A' && wordSearch[y+3][x-3] == 'S') xmasAppearances++
            }
        }
    }
    console.log(xmasAppearances)
    //display2DArray(wordSearch)
})