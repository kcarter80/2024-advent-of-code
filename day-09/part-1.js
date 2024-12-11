function getFirstNullAndNextKey(obj) {
  const keys = Object.keys(obj); // Get all keys
  for (let i = 0; i < keys.length; i++) {
    if (obj[keys[i]] === null) {
      const nullKey = keys[i]; // The first key with a null value
      const nextKey = keys[i + 1] || null; // The next key, or null if none exists
      return { nullKey, nextKey };
    }
  }
  return false // No key with a null value
}

const readline = require('readline')
const fs = require('fs')

const readInterface = readline.createInterface({
    input: fs.createReadStream('./day-09/input'),
})

readInterface.on('line', function(diskMap) {
  console.log('dml',diskMap.length)
    let blocks = new Object
    let blockIndex = 0
    for (let i = 0; i < diskMap.length; i++) { 
        if (i % 2 == 0) {
          blocks[blockIndex] = i / 2
        } else {
          blocks[blockIndex] = null         
        }
        blockIndex += parseInt(diskMap[i])
    }
    blocks[blockIndex] = 'end'
    //console.log(blocks)

    let firstNullAndNextKey = getFirstNullAndNextKey(blocks)
    while (firstNullAndNextKey) {
        let lastTwoKeys = Object.keys(blocks).slice(-2)
        let lastBlockLength = parseInt(lastTwoKeys[1]) - parseInt(lastTwoKeys[0])
        let firstNullLength = parseInt(firstNullAndNextKey['nextKey']) - parseInt(firstNullAndNextKey['nullKey'] )
        // the first null space is smaller than the last file block
        if (lastBlockLength > firstNullLength) {
            // the entire first null space is filled, so only need to set the start key to file  
            blocks[firstNullAndNextKey['nullKey']] = parseInt(blocks[lastTwoKeys[0]])
            // removing the end
            delete blocks[lastTwoKeys[1]]
            // reseting the end
            blocks[lastTwoKeys[1] - firstNullLength] = 'end'
        }
        // the first null space is equal in size or bigger than the last file block
        else {
          // the first null space now starts with the end file block
          blocks[firstNullAndNextKey['nullKey']] = parseInt(blocks[lastTwoKeys[0]])
          // the first null space is bigger in size to the last file block
          if (lastBlockLength < firstNullLength) {
            blocks[parseInt(firstNullAndNextKey['nullKey']) + parseInt(lastTwoKeys[1]) - parseInt(lastTwoKeys[0])] = null
          }

          // remove the last two markers
          delete blocks[lastTwoKeys[1]]
          delete blocks[lastTwoKeys[0]]
          let newLastKey = Object.keys(blocks).slice(-1)[0]
          // if the previous block is null, remove it too
          if (blocks[newLastKey] == null) blocks[newLastKey] = 'end'
          // else the new end is the beginning of the old last block
          else blocks[lastTwoKeys[0]] = 'end'


        }
        firstNullAndNextKey = getFirstNullAndNextKey(blocks)
    }
    let blocksKeys = Object.keys(blocks)
    let checksum = 0 
    for (let i = 0; i < blocksKeys.length; i++) {
      for (let ii = parseInt(blocksKeys[i]); ii < parseInt(blocksKeys[i+1]); ii++) {
        checksum += ii * blocks[blocksKeys[i]]
      }
    }
    console.log(checksum)
}).on('close', function() {
})