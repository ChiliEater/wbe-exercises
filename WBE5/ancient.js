module.exports = {}

require("./scripts.js")

/**
 * 
 * @param {Array} scripts 
 * @returns 
 */
function oldAndLiving(scripts) {
    return scripts.filter(char => char.living == true && char.year < 0)
}

function numberOfCodes(char) {
    out = 0
    for (let range of char.ranges) {
        out += range[1] - range[0]
    }
    return out
}

console.log(oldAndLiving(SCRIPTS))
console.log(numberOfCodes(SCRIPTS[1]))