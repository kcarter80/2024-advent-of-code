const readline = require('readline')
const fs = require('fs')

const readInterface = readline.createInterface({
    input: fs.createReadStream('./day-09/input'),
})

readInterface.on('line', function (diskMap) {
    let initialFileLocationsAndLengths = new Object

    console.log('dml', diskMap.length)
    let blocks = new Object
    let blockIndex = 0
    for (let i = 0; i < diskMap.length; i++) {
        if (i % 2 == 0) {
            blocks[blockIndex] = i / 2
            initialFileLocationsAndLengths[i / 2] = {
                location: blockIndex,
                length: parseInt(diskMap[i])
            }
        } else {
            blocks[blockIndex] = null
        }
        blockIndex += parseInt(diskMap[i])
    }
    blocks[blockIndex] = 'end'
    //console.log(blocks)

    // try to move each file
    for (let fileId of Object.keys(initialFileLocationsAndLengths).reverse()) {
        fileId = parseInt(fileId)
        // find a space of length 2 or greater
        let blocksKeys = Object.keys(blocks)
        for (let i = 0; i < blocksKeys.length - 1; i++) {
            const currentKey = blocksKeys[i];
            const nextKey = blocksKeys[i + 1];

            // found a space to move the file to
            if (blocks[currentKey] === null && nextKey - currentKey >= initialFileLocationsAndLengths[fileId].length && currentKey < initialFileLocationsAndLengths[fileId].location) {
                blocks[currentKey] = fileId
                // if the moved file doesn't use all the space             
                if (nextKey - currentKey > initialFileLocationsAndLengths[fileId].length)
                    blocks[parseInt(currentKey)+initialFileLocationsAndLengths[fileId].length] = null
                blocks[initialFileLocationsAndLengths[fileId].location] = null
                break
            }
        }
    }
    //console.log(blocks)
    let blocksKeys = Object.keys(blocks)
    let checksum = 0 
    // i is which block
    for (let i = 0; i < blocksKeys.length; i++) {
      // ii is position 
      for (let ii = parseInt(blocksKeys[i]); ii < parseInt(blocksKeys[i+1]); ii++) {
        if (blocks[blocksKeys[i]] != null)
            checksum += ii * blocks[blocksKeys[i]]
      }
    }
    console.log(checksum)

}).on('close', function () {
})